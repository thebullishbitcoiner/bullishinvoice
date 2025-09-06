// Main application logic for the invoice generator
//
// DEBUG MODE: Automatically detects development environment and skips Lightning payments
// Auto-detection triggers on: localhost, dev ports (3000, 5173), file:// protocol, etc.
// Manual controls (browser console):
//   toggleDebugMode() - toggles debug mode on/off
//   redetectDebugMode() - re-checks environment for debug mode
//   window.DEBUG_MODE = true - forces debug mode on
// When debug mode is enabled, exports skip payment and execute directly
//
// EXPORT OPTIMIZATION: PDF exports restored to PNG format for proper page filling with compression (~8-10MB vs original ~13MB)
// Quality controls (browser console):
//   setExportQuality('pdf', 'low') - smaller file size (~5-7MB, scale 1.5)
//   setExportQuality('pdf', 'medium') - balanced quality (default, ~8-10MB, scale 2)
//   setExportQuality('pdf', 'high') - best quality (~10-12MB, scale 2)
//   setExportQuality('image', 'low/medium/high') - adjust image export quality
//   window.EXPORT_SETTINGS - view/modify all export settings

import { 
    formatNumber, 
    generateInvoiceNumber, 
    getDefaultDates, 
    showNotification,
    debounce,
    sanitizeHTML
} from './utils.js';

import { 
    saveFormData, 
    loadFormData, 
    saveTemplate, 
    loadTemplate, 
    getTemplateNames,
    loadSettings
} from './storage.js';

import { 
    exportAsImage, 
    exportAsPDF
} from './export.js';

import { LightningPayment } from './lightning-payment.js';

class InvoiceGenerator {
    constructor() {
        this.settings = loadSettings();
        this.autoSaveTimer = null;
        this.lightningPayment = new LightningPayment();
        this.currentLightningInvoice = '';
        this.init();
        this.loadVersion();
    }

    init() {
        this.setupEventListeners();
        this.setupLineItemEventListeners();
        this.loadSavedData();
        this.setupAutoSave();
        this.updatePreview();
        this.setupTemplateControls();
    }

    setupEventListeners() {
        // Form input event listeners
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updatePreview();
                this.saveFormData();
            });
        });

        // Lightning address input
        const lightningAddressInput = document.getElementById('lightningAddress');
        if (lightningAddressInput) {
            lightningAddressInput.addEventListener('input', debounce(async (e) => {
                await this.validateLightningAddress(e.target);
            }, 500));
        }

        // Generate QR button
        const generateQRBtn = document.getElementById('generateQRBtn');
        if (generateQRBtn) {
            generateQRBtn.addEventListener('click', async () => {
                await this.generateInvoiceFromAddress();
            });
        }

        // Export buttons
        const exportPdfBtn = document.getElementById('exportPdfBtn');
        const exportImageBtn = document.getElementById('exportImageBtn');

        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', () => {
            const element = document.getElementById('invoicePreview');
                if (element) {
                    exportAsPDF(element, 'invoice');
                }
        });
        }

        if (exportImageBtn) {
            exportImageBtn.addEventListener('click', () => {
            const element = document.getElementById('invoicePreview');
                if (element) {
                    exportAsImage(element, 'invoice');
                }
        });
        }



        // Initial QR code size update
        this.updateQRCodeSize();
        window.addEventListener('resize', () => this.updateQRCodeSize());

        // Lightning address validation on blur
        const lightningAddressBlur = document.getElementById('lightningAddress');
        if (lightningAddressBlur) {
            lightningAddressBlur.addEventListener('blur', async (e) => {
                await this.validateLightningAddress(e.target);
            });
        }

        // Generate invoice number button
        const generateInvoiceNumberBtn = document.getElementById('generateInvoiceNumberBtn');
        if (generateInvoiceNumberBtn) {
            generateInvoiceNumberBtn.addEventListener('click', () => {
            this.generateNewInvoiceNumber();
        });
        }

        // Clear form button
        const clearFormBtn = document.getElementById('clearFormBtn');
        if (clearFormBtn) {
            clearFormBtn.addEventListener('click', () => {
            this.clearForm();
        });
        }
    }

    getFormData() {
        const lineItems = this.getLineItems();
        const total = lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
        
        return {
            invoiceNumber: document.getElementById('invoiceNumber')?.value || 'INV-001',
            invoiceDate: document.getElementById('invoiceDate')?.value || '',
            fromName: document.getElementById('fromName')?.value || '',
            toName: document.getElementById('toName')?.value || '',
            lineItems: lineItems,
            lightningAddress: document.getElementById('lightningAddress')?.value || '',
            lightningInvoice: this.currentLightningInvoice || '',
            notes: document.getElementById('notes')?.value || '',
            total: total
        };
    }

    getLineItems() {
        const lineItems = [];
        const lineItemElements = document.querySelectorAll('.line-item');
        
        lineItemElements.forEach(element => {
            const itemId = element.getAttribute('data-item-id');
            const description = document.getElementById(`description-${itemId}`)?.value || '';
            const quantity = parseFloat(document.getElementById(`quantity-${itemId}`)?.value) || 1;
            const rate = parseFloat(document.getElementById(`rate-${itemId}`)?.value) || 0;
            
            if (description.trim()) {
                lineItems.push({
                    id: itemId,
                    description: description,
                    quantity: quantity,
                    rate: rate,
                    amount: quantity * rate
                });
            }
        });
        
        return lineItems;
    }

    setFormData(data) {
        if (data.invoiceNumber) document.getElementById('invoiceNumber').value = data.invoiceNumber;
        if (data.invoiceDate) document.getElementById('invoiceDate').value = data.invoiceDate;
        if (data.fromName) document.getElementById('fromName').value = data.fromName;
        if (data.toName) document.getElementById('toName').value = data.toName;
        if (data.lightningAddress) document.getElementById('lightningAddress').value = data.lightningAddress;
        if (data.lightningInvoice) this.currentLightningInvoice = data.lightningInvoice;
        if (data.notes) document.getElementById('notes').value = data.notes;
        
        // Handle line items
        if (data.lineItems && Array.isArray(data.lineItems)) {
            this.setLineItems(data.lineItems);
        }
    }

    setLineItems(lineItems) {
        // Clear existing line items except the first one
        const container = document.getElementById('lineItemsContainer');
        const existingItems = container.querySelectorAll('.line-item');
        
        // Keep the first item and clear its values
        if (existingItems.length > 0) {
            document.getElementById('description-1').value = '';
            document.getElementById('quantity-1').value = '1';
            document.getElementById('rate-1').value = '';
        }
        
        // Remove additional items
        for (let i = 1; i < existingItems.length; i++) {
            existingItems[i].remove();
        }
        
        // Add line items
        lineItems.forEach((item, index) => {
            if (index === 0) {
                // Update first item
                document.getElementById('description-1').value = item.description;
                document.getElementById('quantity-1').value = item.quantity;
                document.getElementById('rate-1').value = item.rate;
            } else {
                // Add new item
                this.addLineItem(item.description, item.quantity, item.rate);
            }
        });
        
        // Update preview
        this.updatePreview();
    }

    updatePreview() {
        const data = this.getFormData();
        const total = data.total;

        // Update preview elements
        if (document.getElementById('previewInvoiceNumber')) {
            document.getElementById('previewInvoiceNumber').textContent = data.invoiceNumber;
        }
        if (document.getElementById('previewInvoiceDate')) {
            document.getElementById('previewInvoiceDate').textContent = data.invoiceDate || '--';
        }
        if (document.getElementById('previewFromName')) {
            document.getElementById('previewFromName').innerHTML = sanitizeHTML(data.fromName.replace(/\n/g, '<br>'));
        }
        if (document.getElementById('previewToName')) {
            document.getElementById('previewToName').innerHTML = sanitizeHTML(data.toName.replace(/\n/g, '<br>'));
        }

        // Update line items table
        this.updatePreviewTable(data.lineItems);

        if (document.getElementById('previewTotal')) {
            document.getElementById('previewTotal').textContent = formatNumber(total);
        }

        // Lightning invoice section
        const lightningSection = document.getElementById('lightningSection');
        if (lightningSection) {
            if (data.lightningInvoice && data.lightningInvoice.trim()) {
                lightningSection.style.display = 'block';
                
                // Decode and display Lightning invoice details
                this.updateLightningDetails(data.lightningInvoice);
                
                // Show QR code container
                const qrContainer = document.getElementById('qrCodeContainer');
                if (qrContainer) {
                    qrContainer.style.display = 'block';
                    this.updateQRCode(data.lightningInvoice);
                }
            } else {
                lightningSection.style.display = 'none';
            }
        }

        // Notes section
        const notesSection = document.getElementById('notesSection');
        if (notesSection) {
            if (data.notes.trim()) {
                notesSection.style.display = 'block';
                document.getElementById('previewNotes').innerHTML = sanitizeHTML(data.notes.replace(/\n/g, '<br>'));
            } else {
                notesSection.style.display = 'none';
            }
        }
    }

    async validateLightningAddress(input) {
        const address = input.value.trim();
        
        input.classList.remove('input-error', 'input-success');
        
        // Don't validate if empty or too short (less than 3 characters)
        if (!address || address.length < 3) {
            this.removeError(input);
            return false;
        }
        
        // Basic lightning address validation (username@domain format)
        const lightningAddressRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = lightningAddressRegex.test(address);
        
        if (!isValid) {
            // Only show error if the address looks complete (contains @ and .)
            if (address.includes('@') && address.includes('.')) {
                input.classList.add('input-error');
                this.showError(input, 'Invalid Lightning Address format (e.g., hello@getalby.com)');
            }
        } else {
            input.classList.add('input-success');
            this.removeError(input);
        }
        
        return isValid;
    }

    async generateInvoiceFromAddress() {
        const addressInput = document.getElementById('lightningAddress');
        const address = addressInput.value.trim();
        
        if (!address) {
            showNotification('Please enter a Lightning Address first', 'warning');
            return;
        }
        
        const isValid = await this.validateLightningAddress(addressInput);
        if (!isValid) {
            showNotification('Please enter a valid Lightning Address', 'warning');
            return;
        }
        
        const total = this.getFormData().total;
        if (total <= 0) {
            showNotification('Please add line items with a total greater than 0', 'warning');
            return;
        }
        
        try {
            showNotification('Generating Lightning invoice...', 'info');
            
            // Import lightning-tools
            const { LightningAddress } = await import('@getalby/lightning-tools');
            
            // Create Lightning Address instance
            const ln = new LightningAddress(address);
            await ln.fetch();
            
            // Request invoice for the total amount with 24-hour expiry
            const invoice = await ln.requestInvoice({ 
                satoshi: total,
                description: `Invoice ${document.getElementById('invoiceNumber')?.value || 'INV-001'}`,
                expiry: 86400 // 24 hours in seconds
            });
            
            // Store the generated invoice
            this.currentLightningInvoice = invoice.paymentRequest;
            
            // Log invoice details for debugging
            console.log('Generated Lightning Invoice:', {
                paymentRequest: invoice.paymentRequest,
                paymentHash: invoice.paymentHash,
                satoshi: invoice.satoshi,
                description: invoice.description,
                timestamp: invoice.timestamp,
                expiry: invoice.expiry,
                invoice: invoice
            });
            
            // Update the preview to show the QR code
            this.updatePreview();
            
            showNotification('Lightning invoice generated successfully!', 'success');
            
        } catch (error) {
            console.error('Error generating Lightning invoice:', error);
            showNotification('Failed to generate Lightning invoice. Please check the address and try again.', 'error');
        }
    }

    showError(input, message) {
        this.removeError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    removeError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    generateNewInvoiceNumber() {
        const newNumber = generateInvoiceNumber(this.settings.defaultInvoicePrefix);
        document.getElementById('invoiceNumber').value = newNumber;
        this.updatePreview();
        this.saveFormData();
        showNotification('New invoice number generated!', 'success');
    }

    clearForm() {
        if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
            const defaultDates = getDefaultDates();
            
            document.getElementById('invoiceNumber').value = generateInvoiceNumber(this.settings.defaultInvoicePrefix);
            document.getElementById('invoiceDate').value = defaultDates.invoiceDate;
            document.getElementById('fromName').value = '';
            document.getElementById('toName').value = '';
            document.getElementById('description').value = '';
            document.getElementById('quantity').value = '1';
            document.getElementById('rate').value = '';
            document.getElementById('lightningAddress').value = '';
            this.currentLightningInvoice = '';
            document.getElementById('notes').value = '';

            this.updatePreview();
            this.saveFormData();
            showNotification('Form cleared successfully!', 'success');
        }
    }

    saveFormData() {
        if (this.settings.autoSave) {
            const formData = this.getFormData();
            saveFormData(formData);
        }
    }

    loadSavedData() {
        const savedData = loadFormData();
        if (savedData) {
            this.setFormData(savedData);
            showNotification('Previous form data loaded!', 'success');
        } else {
            // Set default dates
            const defaultDates = getDefaultDates();
            document.getElementById('invoiceDate').value = defaultDates.invoiceDate;
            
            // Generate initial invoice number
            document.getElementById('invoiceNumber').value = generateInvoiceNumber(this.settings.defaultInvoicePrefix);
        }
    }

    setupAutoSave() {
        if (this.settings.autoSave) {
            this.autoSaveTimer = setInterval(() => {
                this.saveFormData();
            }, this.settings.autoSaveInterval);
        }
    }

    setupTemplateControls() {
        // Add template controls to the form if they don't exist
        const formPanel = document.querySelector('.form-panel');
        if (formPanel && !document.querySelector('.template-controls')) {
            const templateControls = this.createTemplateControls();
            formPanel.insertBefore(templateControls, formPanel.firstChild);
        }
    }

    createTemplateControls() {
        const controls = document.createElement('div');
        controls.className = 'template-controls';
        controls.innerHTML = `
            <h3>Templates</h3>
            <div class="template-buttons">
                <button type="button" class="btn btn-success" onclick="app.saveCurrentTemplate()">
                    Save Template
                </button>
                <button type="button" class="btn btn-secondary" onclick="app.loadTemplateDialog()">
                    Load Template
                </button>
                <button type="button" class="btn btn-warning" onclick="app.clearForm()">
                    Clear Form
                </button>
                <button type="button" class="btn btn-primary" onclick="app.generateNewInvoiceNumber()">
                    New Invoice #
                </button>
            </div>
        `;
        return controls;
    }

    saveCurrentTemplate() {
        const name = prompt('Enter template name:');
        if (name && name.trim()) {
            const templateData = this.getFormData();
            saveTemplate(name.trim(), templateData);
            showNotification(`Template "${name}" saved successfully!`, 'success');
        }
    }

    loadTemplateDialog() {
        const templates = getTemplateNames();
        if (templates.length === 0) {
            showNotification('No saved templates found.', 'warning');
            return;
        }

        const templateList = templates.map(name => `<option value="${name}">${name}</option>`).join('');
        const dialog = document.createElement('div');
        dialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        dialog.innerHTML = `
            <div style="
                background: #1a1a2e;
                padding: 30px;
                border-radius: 15px;
                border: 1px solid rgba(255, 215, 0, 0.3);
                max-width: 400px;
                width: 90%;
            ">
                <h3 style="color: #ffd700; margin-bottom: 20px;">Load Template</h3>
                <select id="templateSelect" style="
                    width: 100%;
                    padding: 12px;
                    margin-bottom: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 215, 0, 0.3);
                    border-radius: 10px;
                    color: white;
                ">
                    ${templateList}
                </select>
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button id="cancelTemplateBtn" style="
                        padding: 10px 20px;
                        background: #6366f1;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Cancel</button>
                    <button id="loadTemplateBtn" style="
                        padding: 10px 20px;
                        background: #10b981;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Load</button>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);
        
        // Add event listeners
        const cancelBtn = dialog.querySelector('#cancelTemplateBtn');
        const loadBtn = dialog.querySelector('#loadTemplateBtn');
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                dialog.remove();
            });
        }
        
        if (loadBtn) {
            loadBtn.addEventListener('click', () => {
                this.loadSelectedTemplate();
                dialog.remove();
            });
        }
    }

    loadSelectedTemplate() {
        const select = document.getElementById('templateSelect');
        const templateName = select.value;
        const templateData = loadTemplate(templateName);
        
        if (templateData) {
            this.setFormData(templateData);
            this.updatePreview();
            this.saveFormData();
            showNotification(`Template "${templateName}" loaded successfully!`, 'success');
        }
    }

    loadVersion() {
        try {
            // Use the version defined by Vite at build time
            const version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.0.2';
            const versionElement = document.getElementById('versionDisplay');
            if (versionElement) {
                versionElement.textContent = `v${version}`;
            }
        } catch (error) {
            console.log('Could not load version, using default');
            // Fallback to default version
        }
    }



    updateQRCodeSize() {
        const qrElement = document.querySelector('#qrCodeContainer bitcoin-qr');
        if (!qrElement) return;
        const calculatedSize = Math.min(Math.floor(window.innerWidth / 3), 300);
        const size = Math.round(calculatedSize / 100) * 100;
        qrElement.setAttribute('width', size);
        qrElement.setAttribute('height', size);
    }

    updateQRCode(lightningInvoice) {
        const qrElement = document.querySelector('#qrCodeContainer bitcoin-qr');
        
        if (qrElement && lightningInvoice) {
            // Update the lightning attribute to generate new QR code
            qrElement.setAttribute('lightning', lightningInvoice);
            qrElement.setAttribute('is-polling', 'true');
            
            // Update dynamic size
            this.updateQRCodeSize();
        }
    }



    async updateLightningDetails(lightningInvoice) {
        try {
            // Import lightning-tools directly
            const { decodeInvoice } = await import('@getalby/lightning-tools');
            const decoded = decodeInvoice(lightningInvoice);
            const expiryElement = document.getElementById('lightningExpiry');
            
            if (decoded && expiryElement) {
                // Display expiration time
                if (decoded.timestamp && decoded.expiry) {
                    const expiryDate = new Date((decoded.timestamp + decoded.expiry) * 1000);
                    const now = new Date();
                    const timeLeft = expiryDate - now;
                    
                    if (timeLeft > 0) {
                        // Format as "Expires: 8/3/2025 4:00 PM"
                        const month = expiryDate.getMonth() + 1;
                        const day = expiryDate.getDate();
                        const year = expiryDate.getFullYear();
                        const hours = expiryDate.getHours();
                        const minutes = expiryDate.getMinutes();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const displayHours = hours % 12 || 12;
                        const displayMinutes = minutes.toString().padStart(2, '0');
                        const formattedDate = `${month}/${day}/${year} ${displayHours}:${displayMinutes} ${ampm}`;
                        expiryElement.textContent = `Expires: ${formattedDate}`;
                    } else {
                        expiryElement.textContent = 'Expired';
                    }
                } else {
                    expiryElement.textContent = 'Expiration time not available';
                }
                
                expiryElement.style.display = 'inline-block';
            } else {
                // Hide expiry if decoding failed
                if (expiryElement) {
                    expiryElement.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Error updating Lightning details:', error);
            const expiryElement = document.getElementById('lightningExpiry');
            if (expiryElement) {
                expiryElement.style.display = 'none';
            }
        }
    }

    updatePreviewTable(lineItems) {
        const tableBody = document.getElementById('previewItemsTable');
        if (!tableBody) return;

        // Clear existing rows
        tableBody.innerHTML = '';

        // Add rows for each line item
        lineItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sanitizeHTML(item.description)}</td>
                <td>${item.quantity}</td>
                <td>${formatNumber(item.rate)}</td>
                <td class="amount">${formatNumber(item.amount)}</td>
            `;
            tableBody.appendChild(row);
        });

        // Add empty row if no items
        if (lineItems.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>No items</td>
                <td>0</td>
                <td>0</td>
                <td class="amount">0</td>
            `;
            tableBody.appendChild(row);
        }
    }

    addLineItem(description = '', quantity = 1, rate = 0) {
        const nextId = this.getNextItemId();
        const lineItemHTML = `
            <div class="line-item" data-item-id="${nextId}">
                <div class="form-group">
                    <label for="description-${nextId}">Item/Service Description</label>
                    <input type="text" id="description-${nextId}" placeholder="Bitcoin Consulting Services" class="item-description" value="${description}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="quantity-${nextId}">Quantity</label>
                        <input type="number" id="quantity-${nextId}" placeholder="1" value="${quantity}" min="1" class="item-quantity">
                    </div>
                    <div class="form-group">
                        <label for="rate-${nextId}">Price</label>
                        <div class="sats-input">
                            <input type="number" id="rate-${nextId}" placeholder="100000" min="1" class="item-rate" value="${rate}">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-danger remove-item" data-item-id="${nextId}">X</button>
            </div>
        `;
        
        const container = document.getElementById('lineItemsContainer');
        container.insertAdjacentHTML('beforeend', lineItemHTML);
        
        this.addLineItemEventListeners(nextId);
    }

    getNextItemId() {
        const existingItems = document.querySelectorAll('.line-item');
        let maxId = 0;
        
        existingItems.forEach(item => {
            const id = parseInt(item.getAttribute('data-item-id'));
            if (id > maxId) maxId = id;
        });
        
        return maxId + 1;
    }

    addLineItemEventListeners(itemId) {
        const inputs = [
            document.getElementById(`description-${itemId}`),
            document.getElementById(`quantity-${itemId}`),
            document.getElementById(`rate-${itemId}`)
        ];
        
        inputs.forEach(input => {
            if (input) {
                input.addEventListener('input', debounce(() => {
                    this.updatePreview();
                    this.saveFormData();
                }, 300));
            }
        });
        
        // Add remove button listener
        const removeBtn = document.querySelector(`[data-item-id="${itemId}"].remove-item`);
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                this.removeLineItem(itemId);
            });
        }
    }

    removeLineItem(itemId) {
        const lineItem = document.querySelector(`[data-item-id="${itemId}"]`);
        if (lineItem) {
            lineItem.remove();
            this.updatePreview();
            this.saveFormData();
        }
    }

    setupLineItemEventListeners() {
        // Add event listeners to existing line items
        const existingItems = document.querySelectorAll('.line-item');
        existingItems.forEach(item => {
            const itemId = item.getAttribute('data-item-id');
            this.addLineItemEventListeners(itemId);
        });

        // Add event listener to "Add Line Item" button
        const addBtn = document.getElementById('addLineItemBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.addLineItem();
            });
        }
    }


}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new InvoiceGenerator();
    window.app = app; // Make it globally accessible for template functions
}); 