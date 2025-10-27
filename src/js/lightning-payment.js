// Lightning payment functionality using lightning-tools and bitcoin-qr

import { showNotification } from './utils.js';

class LightningPayment {
    constructor() {
        this.isProcessing = false;
        this.currentInvoice = null;
        this.qrElement = null;
        this.paymentCompleted = false; // Flag to prevent duplicate exports
        
        // Auto-detect debug mode based on environment
        this.debugMode = this.detectDebugMode();
        
        // Log initial debug mode status
        if (this.debugMode) {
            console.log('🚀 LightningPayment initialized with DEBUG MODE ENABLED');
            console.log('   Exports will skip payment and execute directly');
        }
        
        // Make debug functions available globally
        window.toggleDebugMode = () => this.toggleDebugMode();
        window.redetectDebugMode = () => this.redetectDebugMode();
    }

    /**
     * Create a Lightning invoice using lightning-tools
     * @returns {Promise<Object>} The created invoice
     */
    async createInvoice() {
        try {
            const { LightningAddress } = await import('@getalby/lightning-tools');
            
            const ln = new LightningAddress('bullish@getalby.com');
            await ln.fetch();
            
            const invoice = await ln.requestInvoice({ 
                satoshi: 21,
                description: 'Export payment for bullishInvoice',
                expiry: 86400 // 24 hours
            });
            
            console.log('Invoice created:', {
                paymentRequest: invoice.paymentRequest,
                paymentHash: invoice.paymentHash,
                satoshi: invoice.satoshi
            });
            
            return invoice;
        } catch (error) {
            console.error('Error creating invoice:', error);
            throw new Error('Failed to create Lightning invoice');
        }
    }



    /**
     * Display the invoice using bitcoin-qr
     * @param {Object} invoice - The Lightning invoice object
     * @param {Function} onPaymentComplete - Callback when payment is completed
     */
    async displayInvoice(invoice, onPaymentComplete) {
        try {
            // Create QR element
            const qrContainer = document.querySelector('#qr-container');
            if (!qrContainer) {
                throw new Error('QR container not found');
            }

            // Create bitcoin-qr element
            const qr = document.createElement('bitcoin-qr');
            qr.setAttribute('width', '400');
            qr.setAttribute('height', '400');
            qr.setAttribute('lightning', invoice.paymentRequest);
            qr.setAttribute('is-polling', 'true');
            qr.setAttribute('poll-interval', '3000');
            qr.setAttribute('type', 'svg');
            qr.setAttribute('corners-square-color', '#ff9900');
            qr.setAttribute('corners-dot-color', '#ff9900');
            qr.setAttribute('corners-square-type', 'square');
            qr.setAttribute('dots-type', 'square');
            qr.setAttribute('dots-color', '#ff9900');

            // Set up payment verification callback
            qr.callback = async () => {
                await this.checkPaymentStatus(invoice, onPaymentComplete);
            };

            qrContainer.appendChild(qr);
            this.qrElement = qr;

            console.log('QR code displayed for invoice:', invoice.paymentRequest);

        } catch (error) {
            console.error('Error displaying invoice with bitcoin-qr:', error);
            throw new Error('Failed to display invoice');
        }
    }

    /**
     * Create a modal overlay for payment
     */
    createModalOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'payment-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: Arial, sans-serif;
        `;

        overlay.innerHTML = `
            <div style="text-align: center; padding: 20px; background: rgba(0, 0, 0, 0.9); border-radius: 12px; max-width: 500px;">
                <div style="font-size: 32px; margin-bottom: 15px;">⚡</div>
                <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">Lightning Payment</div>
                <div style="font-size: 16px; margin-bottom: 20px; opacity: 0.8;">Scan QR code to pay 21 sats</div>
                <div id="qr-container" style="display: flex; justify-content: center; margin-bottom: 20px;"></div>
                <div id="payment-status" style="font-size: 16px; margin-bottom: 10px; color: #ff9900; font-weight: bold;">Waiting for payment...</div>
                <div style="font-size: 14px; opacity: 0.7;">Payment will be verified automatically</div>
                <button id="close-payment-modal" style="
                    margin-top: 15px;
                    padding: 8px 16px;
                    background: #ff9900;
                    color: #000;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: bold;
                ">Close</button>
            </div>
        `;

        document.body.appendChild(overlay);
        
        // Add close button functionality
        const closeBtn = overlay.querySelector('#close-payment-modal');
        closeBtn.addEventListener('click', () => {
            this.cancelPayment();
        });
        
        return overlay;
    }

    /**
     * Remove the modal overlay
     */
    removeModalOverlay() {
        const overlay = document.getElementById('payment-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    /**
     * Create export processing modal
     */
    createExportProcessingModal() {
        // Remove the payment modal first
        this.removeModalOverlay();
        
        const overlay = document.createElement('div');
        overlay.id = 'export-processing-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: Arial, sans-serif;
        `;

        overlay.innerHTML = `
            <div style="text-align: center; padding: 30px; background: rgba(0, 0, 0, 0.9); border-radius: 12px; max-width: 400px;">
                <div style="margin-bottom: 20px;">
                    <div class="loading-spinner" style="
                        width: 60px;
                        height: 60px;
                        border: 4px solid rgba(255, 153, 0, 0.3);
                        border-top: 4px solid #ff9900;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    "></div>
                </div>
                <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">Processing Export</div>
                <div style="font-size: 16px; margin-bottom: 15px; opacity: 0.8;">Creating your file...</div>
                <div id="export-status" style="font-size: 14px; color: #ff9900; font-weight: bold;">Please wait while we generate your file</div>
            </div>
        `;

        // Add CSS animation for spinner
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(overlay);
        return overlay;
    }

    /**
     * Remove export processing modal
     */
    removeExportProcessingModal() {
        const overlay = document.getElementById('export-processing-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    /**
     * Check payment status using lightning-tools
     * @param {Object} invoice - The Lightning invoice object
     * @param {Function} onPaymentComplete - Callback when payment is completed
     */
    async checkPaymentStatus(invoice, onPaymentComplete) {
        // Prevent duplicate processing
        if (this.paymentCompleted) {
            return;
        }
        
        try {
            const paid = await invoice.verifyPayment();
            
            if (paid && invoice.preimage) {
                console.log('Payment verified successfully!');
                console.log(`Preimage: ${invoice.preimage}`);
                
                // Set flag to prevent duplicate processing
                this.paymentCompleted = true;
                
                // Stop bitcoin-qr polling
                if (this.qrElement) {
                    this.qrElement.setAttribute('is-polling', 'false');
                }
                
                // Update payment status message
                const paymentStatus = document.getElementById('payment-status');
                if (paymentStatus) {
                    paymentStatus.textContent = '✅ Payment received! Processing export...';
                    paymentStatus.style.color = '#10b981';
                }
                
                // Create and show export processing modal
                this.createExportProcessingModal();
                
                // Call the completion callback
                onPaymentComplete(true);
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
        }
    }

    /**
     * Cancel the current payment
     */
    cancelPayment() {
        if (this.qrElement) {
            this.qrElement.remove();
            this.qrElement = null;
        }
        
        this.isProcessing = false;
        this.currentInvoice = null;
        this.paymentCompleted = false; // Reset flag
        this.removeModalOverlay();
        
        showNotification('Payment cancelled.', 'info');
    }

    /**
     * Handle the complete payment flow for export
     * @param {Function} exportFunction - The export function to call after payment
     * @param {Array} exportArgs - Arguments to pass to the export function
     * @returns {Promise<void>}
     */
    async handleExportPayment(exportFunction, exportArgs) {
        if (this.isProcessing) {
            showNotification('Payment already in progress. Please wait.', 'warning');
            return;
        }

        // Check if debug mode is enabled
        if (this.debugMode) {
            console.log('🐛 DEBUG MODE: Skipping Lightning payment, executing export directly');
            showNotification('Debug mode: Skipping payment, exporting directly...', 'info');
            
            try {
                await exportFunction(...exportArgs);
                showNotification('Export completed (debug mode)!', 'success');
            } catch (error) {
                console.error('Error in debug export:', error);
                showNotification('Error during debug export. Please try again.', 'error');
            }
            return;
        }

        this.isProcessing = true;
        this.paymentCompleted = false; // Reset flag for new payment

        this.createModalOverlay();

        try {
            showNotification('Creating Lightning invoice...', 'info');
            const invoice = await this.createInvoice();
            this.currentInvoice = invoice;

            console.log('Created invoice:', {
                paymentRequest: invoice.paymentRequest,
                paymentHash: invoice.paymentHash,
                satoshi: invoice.satoshi
            });

            showNotification('Invoice created! Please scan QR code to pay.', 'success');

            await this.displayInvoice(invoice, async (isPaid) => {
                if (isPaid) {
                    showNotification('Payment received! Processing export...', 'success');
                    console.log('Payment verified successfully!');
                    
                    // Store preimage before clearing currentInvoice
                    const preimage = this.currentInvoice?.preimage;
                    if (preimage) {
                        console.log(`Preimage: ${preimage}`);
                    }

                    // Process the export
                    try {
                        await exportFunction(...exportArgs);
                        
                        // Update export status to success
                        const exportStatus = document.getElementById('export-status');
                        if (exportStatus) {
                            exportStatus.textContent = 'Export completed successfully!';
                            exportStatus.style.color = '#10b981';
                        }
                        
                        // Update modal content to show success
                        const overlay = document.getElementById('export-processing-overlay');
                        if (overlay) {
                            const content = overlay.querySelector('div > div');
                            if (content) {
                                content.innerHTML = `
                                    <div style="margin-bottom: 20px;">
                                        <div style="
                                            width: 60px;
                                            height: 60px;
                                            border: 4px solid #10b981;
                                            border-radius: 50%;
                                            margin: 0 auto 20px;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: 24px;
                                            color: #10b981;
                                        ">✓</div>
                                    </div>
                                    <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">Export Complete</div>
                                    <div style="font-size: 16px; margin-bottom: 15px; opacity: 0.8;">Your file has been downloaded</div>
                                    <div id="export-status" style="font-size: 14px; color: #10b981; font-weight: bold;">Export completed successfully!</div>
                                `;
                            }
                        }
                        
                        showNotification('Export completed successfully!', 'success');
                        
                        // Close modal after a short delay to show success
                        setTimeout(() => {
                            this.isProcessing = false;
                            this.currentInvoice = null;
                            this.paymentCompleted = false; // Reset flag
                            this.removeExportProcessingModal();
                        }, 2000);
                        
                    } catch (error) {
                        console.error('Error during export:', error);
                        
                        // Update export status to error
                        const exportStatus = document.getElementById('export-status');
                        if (exportStatus) {
                            exportStatus.textContent = 'Export failed';
                            exportStatus.style.color = '#ef4444';
                        }
                        
                        // Update modal content to show error
                        const overlay = document.getElementById('export-processing-overlay');
                        if (overlay) {
                            const content = overlay.querySelector('div > div');
                            if (content) {
                                content.innerHTML = `
                                    <div style="margin-bottom: 20px;">
                                        <div style="
                                            width: 60px;
                                            height: 60px;
                                            border: 4px solid #ef4444;
                                            border-radius: 50%;
                                            margin: 0 auto 20px;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: 24px;
                                            color: #ef4444;
                                        ">✗</div>
                                    </div>
                                    <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">Export Failed</div>
                                    <div style="font-size: 16px; margin-bottom: 15px; opacity: 0.8;">Something went wrong</div>
                                    <div id="export-status" style="font-size: 14px; color: #ef4444; font-weight: bold;">Export failed</div>
                                `;
                            }
                        }
                        
                        showNotification('Error during export. Please try again.', 'error');
                        
                        // Close modal after showing error
                        setTimeout(() => {
                            this.isProcessing = false;
                            this.currentInvoice = null;
                            this.paymentCompleted = false; // Reset flag
                            this.removeExportProcessingModal();
                        }, 3000);
                    }
                } else {
                    showNotification('Payment cancelled.', 'info');
                    this.isProcessing = false;
                    this.currentInvoice = null;
                    this.paymentCompleted = false; // Reset flag
                    this.removeModalOverlay();
                }
            });

        } catch (error) {
            console.error('Error in payment flow:', error);
            showNotification('Error processing payment. Please try again.', 'error');

            this.isProcessing = false;
            this.currentInvoice = null;
            this.paymentCompleted = false; // Reset flag
            this.removeModalOverlay();
            this.removeExportProcessingModal();
        }
    }

    /**
     * Automatically detect if we're in debug/development mode
     * @returns {boolean} True if in debug mode
     */
    detectDebugMode() {
        // Check multiple indicators of development mode
        const indicators = {
            // 1. Manual override (highest priority)
            manualOverride: window.DEBUG_MODE === true,
            
            // 2. Vite build-time development mode
            isViteDev: typeof __DEV_MODE__ !== 'undefined' && __DEV_MODE__ === true, // eslint-disable-line no-undef
            
            // 3. Localhost/development server
            isLocalhost: window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname === '0.0.0.0',
            
            // 4. Development port (Vite default)
            isDevPort: window.location.port === '3000' || 
                      window.location.port === '5173' || // Vite default
                      window.location.port === '8080',
            
            // 5. Development URL patterns
            isDevUrl: window.location.href.includes('localhost') ||
                     window.location.href.includes('127.0.0.1') ||
                     window.location.href.includes(':3000') ||
                     window.location.href.includes(':5173'),
            
            // 6. File protocol (opening HTML directly)
            isFileProtocol: window.location.protocol === 'file:',
            
            // 7. Development build indicators
            hasDevTools: window.location.search.includes('dev') ||
                        window.location.search.includes('debug'),
            
            // 8. Console detection (if dev tools are open)
            hasConsole: window.outerHeight - window.innerHeight > 200,
            
            // 9. Source maps available (development build indicator)
            hasSourceMaps: document.querySelector('script[src*=".js"]')?.src.includes('?') || false
        };
        
        // Count positive indicators
        const positiveIndicators = Object.values(indicators).filter(Boolean).length;
        
        // Consider it debug mode if we have multiple indicators or manual override
        const isDebugMode = indicators.manualOverride || positiveIndicators >= 2;
        
        // Log detection results for transparency
        if (isDebugMode) {
            console.log('🐛 Debug mode auto-detected:', {
                indicators,
                positiveCount: positiveIndicators,
                reason: indicators.manualOverride ? 'Manual override' : 
                       `${positiveIndicators} development indicators detected`
            });
        }
        
        return isDebugMode;
    }

    /**
     * Toggle debug mode on/off
     * @returns {boolean} Current debug mode state
     */
    toggleDebugMode() {
        this.debugMode = !this.debugMode;
        window.DEBUG_MODE = this.debugMode;
        
        const status = this.debugMode ? 'ENABLED' : 'DISABLED';
        const emoji = this.debugMode ? '🐛' : '✅';
        
        console.log(`${emoji} Debug mode ${status}`);
        console.log('Debug mode allows exports without Lightning payment');
        
        showNotification(`Debug mode ${status.toLowerCase()}`, this.debugMode ? 'warning' : 'success');
        
        return this.debugMode;
    }

    /**
     * Re-detect debug mode (useful for dynamic environment changes)
     * @returns {boolean} Current debug mode state
     */
    redetectDebugMode() {
        this.debugMode = this.detectDebugMode();
        console.log(`🔄 Debug mode re-detected: ${this.debugMode ? 'ENABLED' : 'DISABLED'}`);
        return this.debugMode;
    }
}

export { LightningPayment };
