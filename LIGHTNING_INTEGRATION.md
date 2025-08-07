# Lightning Payment Integration

This document describes the Lightning payment integration in the BullishInvoice application.

## Overview

The application integrates Lightning payments for export functionality using:
- **`@getalby/lightning-tools`**: For creating Lightning invoices and verifying payments
- **`bitcoin-qr`**: For displaying QR codes and handling payment polling

## How It Works

### 1. Invoice Creation

When a user clicks an export button (PDF or Image), the system:

1. Creates a 21 sat Lightning invoice using `bullish@blitz-wallet.com`
2. Displays a modal overlay with a QR code
3. Polls for payment verification
4. Proceeds with export once payment is confirmed

### 2. Payment Flow

```javascript
// Create invoice using lightning-tools
const { LightningAddress } = await import('@getalby/lightning-tools');
const ln = new LightningAddress('bullish@blitz-wallet.com');
await ln.fetch();
const invoice = await ln.requestInvoice({ satoshi: 21 });
```

### 3. QR Code Display

The invoice is displayed using the `bitcoin-qr` web component:

```javascript
// Create bitcoin-qr element
const qr = document.createElement('bitcoin-qr');
qr.setAttribute('width', '300');
qr.setAttribute('height', '300');
qr.setAttribute('lightning', invoice.paymentRequest);
qr.setAttribute('is-polling', 'true');
qr.setAttribute('poll-interval', '3000');
qr.setAttribute('type', 'svg');
qr.setAttribute('corners-square-color', '#000');
qr.setAttribute('corners-dot-color', '#ff9900');
qr.setAttribute('corners-square-type', 'square');
qr.setAttribute('dots-type', 'square');
qr.setAttribute('dots-color', '#000');
qr.setAttribute('debug', 'true');

// Set up payment verification callback
qr.callback = async () => {
    await this.checkPaymentStatus(invoice, onPaymentComplete);
};
```

### 4. Payment Verification

Payment verification is handled by `lightning-tools`:

```javascript
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
```

## User Experience

### Modal Overlay

During the payment process, a modal overlay prevents interaction with the main page:

- **Background**: Semi-transparent dark overlay
- **Content**: Lightning icon, payment instructions, QR code, and close button
- **Styling**: Consistent with the app's orange theme (`#ff9900`)

### Notifications

All notifications use the consistent orange color (`#ff9900`):

- **Creating invoice**: "Creating Lightning invoice..."
- **Invoice ready**: "Invoice created! Please scan QR code to pay."
- **Payment received**: "Payment received! Processing export..."
- **Export complete**: "Export completed successfully!"
- **Errors**: "Error processing payment. Please try again."

## Technical Implementation

### Dependencies

```json
{
  "@getalby/lightning-tools": "^5.2.1",
  "bitcoin-qr": "^1.4.1"
}
```

### Key Files

- **`src/js/lightning-payment.js`**: Main Lightning payment logic
- **`src/js/export.js`**: Export functions wrapped with payment flow
- **`src/js/app.js`**: Application initialization and event handling
- **`src/index.html`**: HTML structure with bitcoin-qr script import

### Integration Points

1. **Export Functions**: `exportAsImage` and `exportAsPDF` are wrapped with payment flow
2. **Event Listeners**: Export buttons trigger the payment process
3. **Modal Management**: Prevents page interaction during payment
4. **Error Handling**: Comprehensive error handling and user feedback

## Configuration

### Lightning Address

The Lightning address used for invoice creation is `bullish@blitz-wallet.com`.

### Payment Amount

The payment amount is fixed at 21 sats for all exports.

### Polling Interval

The QR code polls for payment verification every 3 seconds.

### Styling

- **QR Code**: 300x300 pixels, SVG format
- **Colors**: Black dots with orange corner accents (`#ff9900`)
- **Modal**: Dark theme with orange accent color

## Error Handling

The system handles various error scenarios:

- **Network errors**: Invoice creation failures
- **Payment timeouts**: User cancellation
- **Export errors**: File generation issues
- **Verification errors**: Payment status check failures

All errors are logged to the console and displayed to the user via notifications.
