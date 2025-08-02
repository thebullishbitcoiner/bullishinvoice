// Main application logic for the invoice generator

import { 
    formatNumber, 
    generateInvoiceNumber, 
    validateLightningInvoice, 
    getDefaultDates, 
    calculateTotal,
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
    deleteTemplate,
    loadSettings,
    saveSettings
} from './storage.js';

import { 
    exportAsImage, 
    exportAsPDF, 
    printInvoice 
} from './export.js';

class InvoiceGenerator {
    constructor() {
        this.settings = loadSettings();
        this.autoSaveTimer = null;
        this.init();
        this.loadVersion();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedData();
        this.setupAutoSave();
        this.updatePreview();
        this.setupTemplateControls();
    }

    setupEventListeners() {
        // Form input listeners
        document.querySelectorAll('input, textarea').forEach(element => {
            element.addEventListener('input', debounce(() => {
                this.updatePreview();
                this.saveFormData();
            }, 300));
        });

        // Export buttons
        document.getElementById('exportPdfBtn')?.addEventListener('click', () => {
            const element = document.getElementById('invoicePreview');
            const filename = `invoice-${this.getFormData().invoiceNumber || 'INV-001'}`;
            exportAsPDF(element, filename);
        });

        document.getElementById('exportImageBtn')?.addEventListener('click', () => {
            const element = document.getElementById('invoicePreview');
            const filename = `invoice-${this.getFormData().invoiceNumber || 'INV-001'}`;
            exportAsImage(element, filename);
        });



        document.getElementById('printBtn')?.addEventListener('click', () => {
            const element = document.getElementById('invoicePreview');
            printInvoice(element);
        });

        // Lightning invoice validation
        document.getElementById('lightningInvoice')?.addEventListener('blur', (e) => {
            this.validateLightningInvoice(e.target);
        });



        // Generate invoice number button
        document.getElementById('generateInvoiceNumberBtn')?.addEventListener('click', () => {
            this.generateNewInvoiceNumber();
        });

        // Clear form button
        document.getElementById('clearFormBtn')?.addEventListener('click', () => {
            this.clearForm();
        });
    }

    getFormData() {
        return {
            invoiceNumber: document.getElementById('invoiceNumber')?.value || 'INV-001',
            invoiceDate: document.getElementById('invoiceDate')?.value || '',
            fromName: document.getElementById('fromName')?.value || '',
            toName: document.getElementById('toName')?.value || '',
            description: document.getElementById('description')?.value || '',
            quantity: parseInt(document.getElementById('quantity')?.value) || 1,
            rate: parseInt(document.getElementById('rate')?.value) || 0,
            lightningInvoice: document.getElementById('lightningInvoice')?.value || '',
            notes: document.getElementById('notes')?.value || '',
            total: calculateTotal(
                parseInt(document.getElementById('quantity')?.value) || 1,
                parseInt(document.getElementById('rate')?.value) || 0
            )
        };
    }

    setFormData(data) {
        if (data.invoiceNumber) document.getElementById('invoiceNumber').value = data.invoiceNumber;
        if (data.invoiceDate) document.getElementById('invoiceDate').value = data.invoiceDate;
        if (data.fromName) document.getElementById('fromName').value = data.fromName;
        if (data.toName) document.getElementById('toName').value = data.toName;
        if (data.description) document.getElementById('description').value = data.description;
        if (data.quantity) document.getElementById('quantity').value = data.quantity;
        if (data.rate) document.getElementById('rate').value = data.rate;
        if (data.lightningInvoice) document.getElementById('lightningInvoice').value = data.lightningInvoice;
        if (data.notes) document.getElementById('notes').value = data.notes;
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
        if (document.getElementById('previewDescription')) {
            document.getElementById('previewDescription').textContent = data.description;
        }
        if (document.getElementById('previewQuantity')) {
            document.getElementById('previewQuantity').textContent = data.quantity;
        }
        if (document.getElementById('previewRate')) {
            document.getElementById('previewRate').textContent = formatNumber(data.rate);
        }
        if (document.getElementById('previewAmount')) {
            document.getElementById('previewAmount').textContent = formatNumber(total);
        }
        if (document.getElementById('previewTotal')) {
            document.getElementById('previewTotal').textContent = formatNumber(total);
        }

        // Lightning invoice section
        const lightningSection = document.getElementById('lightningSection');
        if (lightningSection) {
            if (data.lightningInvoice.trim()) {
                lightningSection.style.display = 'block';
                document.getElementById('previewLightningInvoice').textContent = data.lightningInvoice;
                
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

    validateLightningInvoice(input) {
        const isValid = validateLightningInvoice(input.value);
        
        input.classList.remove('input-error', 'input-success');
        
        if (input.value.trim() && !isValid) {
            input.classList.add('input-error');
            this.showError(input, 'Invalid Lightning Network invoice format');
        } else if (input.value.trim() && isValid) {
            input.classList.add('input-success');
            this.removeError(input);
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
            document.getElementById('lightningInvoice').value = '';
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
            <h3>📋 Templates</h3>
            <div class="template-buttons">
                <button type="button" class="btn btn-small btn-success" onclick="app.saveCurrentTemplate()">
                    💾 Save Template
                </button>
                <button type="button" class="btn btn-small btn-secondary" onclick="app.loadTemplateDialog()">
                    📂 Load Template
                </button>
                <button type="button" class="btn btn-small btn-warning" onclick="app.clearForm()">
                    🗑️ Clear Form
                </button>
                <button type="button" class="btn btn-small btn-primary" onclick="app.generateNewInvoiceNumber()">
                    🔄 New Invoice #
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
                    <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="
                        padding: 10px 20px;
                        background: #6366f1;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    ">Cancel</button>
                    <button onclick="app.loadSelectedTemplate()" style="
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
        
        // Close dialog
        document.querySelector('div[style*="position: fixed"]').remove();
    }

    async loadVersion() {
        try {
            const response = await fetch('/package.json');
            const packageData = await response.json();
            const versionElement = document.querySelector('.version');
            if (versionElement) {
                versionElement.textContent = `v${packageData.version}`;
            }
        } catch (error) {
            console.log('Could not load version from package.json, using default');
            // Fallback to default version if package.json is not accessible
        }
    }

    updateQRCode(lightningInvoice) {
        const qrElement = document.getElementById('lightningQR');
        if (qrElement && lightningInvoice) {
            // Update the lightning attribute to generate new QR code
            qrElement.setAttribute('lightning', lightningInvoice);
        }
    }


}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new InvoiceGenerator();
    window.app = app; // Make it globally accessible for template functions
}); 