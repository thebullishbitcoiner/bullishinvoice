// Lightning payment functionality using lightning-tools and bitcoin-qr

import { showNotification } from './utils.js';

class LightningPayment {
    constructor() {
        this.isProcessing = false;
        this.currentInvoice = null;
        this.paymentCheckInterval = null;
        this.qrElement = null;
    }

    /**
     * Create a Lightning invoice using lightning-tools
     * @returns {Promise<Object>} The created invoice
     */
    async createInvoice() {
        try {
            const { LightningAddress } = await import('@getalby/lightning-tools');
            
            const ln = new LightningAddress('bullish@blitz-wallet.com');
            await ln.fetch();
            
            const invoice = await ln.requestInvoice({ satoshi: 20 });
            
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
     * Create a modal overlay to prevent page interaction
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
            qr.setAttribute('debug', 'true');

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
     * Check payment status using lightning-tools
     * @param {Object} invoice - The Lightning invoice object
     * @param {Function} onPaymentComplete - Callback when payment is completed
     */
    async checkPaymentStatus(invoice, onPaymentComplete) {
        try {
            const paid = await invoice.verifyPayment();
            
            if (paid && invoice.preimage) {
                console.log('Payment verified successfully!');
                console.log(`Preimage: ${invoice.preimage}`);
                
                // Stop polling
                if (this.qrElement) {
                    this.qrElement.setAttribute('is-polling', 'false');
                }
                
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
            this.qrElement.setAttribute('is-polling', 'false');
        }
        
        if (this.paymentCheckInterval) {
            clearInterval(this.paymentCheckInterval);
            this.paymentCheckInterval = null;
        }
        
        this.isProcessing = false;
        this.currentInvoice = null;
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

        this.isProcessing = true;

        const overlay = this.createModalOverlay();

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

                    setTimeout(async () => {
                        try {
                            await exportFunction(...exportArgs);
                            showNotification('Export completed successfully!', 'success');
                        } catch (error) {
                            console.error('Error during export:', error);
                            showNotification('Error during export. Please try again.', 'error');
                        }
                    }, 3000);
                } else {
                    showNotification('Payment cancelled.', 'info');
                }

                this.isProcessing = false;
                this.currentInvoice = null;
                this.removeModalOverlay();
            });

        } catch (error) {
            console.error('Error in payment flow:', error);
            showNotification('Error processing payment. Please try again.', 'error');

            this.isProcessing = false;
            this.currentInvoice = null;
            this.removeModalOverlay();
        }
    }
}

export { LightningPayment };
