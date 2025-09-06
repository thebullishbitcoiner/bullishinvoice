// Export functionality for PDF and image generation

import { showNotification } from './utils.js';
import { LightningPayment } from './lightning-payment.js';

// Initialize Lightning payment handler
const lightningPayment = new LightningPayment();

// Export quality settings - can be adjusted for different quality/size tradeoffs
const EXPORT_SETTINGS = {
    // PDF settings - restored to original PNG format for proper page filling
    pdf: {
        scale: 2, // Keep at 2 to ensure content fills the entire page
        format: 'png', // Use PNG format like original for proper scaling
        compression: true, // Enable PDF compression
        fastMode: false // Better quality rendering
    },
    // Image settings
    image: {
        scale: 1.5, // Canvas scale for images
        jpegQuality: 0.9, // JPEG quality for images
        format: 'jpeg' // 'jpeg' for smaller files, 'png' for lossless
    }
};

// Make export settings globally accessible for debugging
window.EXPORT_SETTINGS = EXPORT_SETTINGS;

// Helper function to adjust export quality
window.setExportQuality = (type, quality) => {
    if (type === 'pdf') {
        if (quality === 'high') {
            EXPORT_SETTINGS.pdf.scale = 2;
            EXPORT_SETTINGS.pdf.format = 'png';
            EXPORT_SETTINGS.pdf.fastMode = false;
        } else if (quality === 'medium') {
            EXPORT_SETTINGS.pdf.scale = 2; // Keep at 2 for proper page filling
            EXPORT_SETTINGS.pdf.format = 'png'; // PNG for proper scaling
            EXPORT_SETTINGS.pdf.fastMode = false; // Better quality
        } else if (quality === 'low') {
            EXPORT_SETTINGS.pdf.scale = 1.5; // Slightly reduced for smaller files
            EXPORT_SETTINGS.pdf.format = 'png';
            EXPORT_SETTINGS.pdf.fastMode = true;
        }
        console.log(`PDF quality set to: ${quality}`, EXPORT_SETTINGS.pdf);
    } else if (type === 'image') {
        if (quality === 'high') {
            EXPORT_SETTINGS.image.scale = 2;
            EXPORT_SETTINGS.image.jpegQuality = 0.95;
            EXPORT_SETTINGS.image.format = 'png';
        } else if (quality === 'medium') {
            EXPORT_SETTINGS.image.scale = 1.5;
            EXPORT_SETTINGS.image.jpegQuality = 0.9;
            EXPORT_SETTINGS.image.format = 'jpeg';
        } else if (quality === 'low') {
            EXPORT_SETTINGS.image.scale = 1;
            EXPORT_SETTINGS.image.jpegQuality = 0.8;
            EXPORT_SETTINGS.image.format = 'jpeg';
        }
        console.log(`Image quality set to: ${quality}`, EXPORT_SETTINGS.image);
    }
};

/**
 * Export invoice as image
 * @param {HTMLElement} element - Element to export
 * @param {string} filename - Filename for the export
 */
export async function exportAsImage(element, filename) {
    // Handle the export through Lightning payment
    await lightningPayment.handleExportPayment(performImageExport, [element, filename]);
}

/**
 * Perform the actual image export (called after payment)
 * @param {HTMLElement} element - Element to export
 * @param {string} filename - Filename for the export
 */
async function performImageExport(element, filename) {
    try {
        // Import html2canvas dynamically
        const html2canvas = (await import('html2canvas')).default;
        
        // Optimized canvas settings for better performance and smaller file size
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: EXPORT_SETTINGS.image.scale,
            useCORS: true,
            allowTaint: false,
            logging: false,
            scrollX: 0,
            scrollY: 0,
            // Additional optimizations
            width: element.offsetWidth,
            height: element.offsetHeight,
            windowWidth: element.offsetWidth,
            windowHeight: element.offsetHeight
        });

        // Create download link with configurable compression
        const link = document.createElement('a');
        const extension = EXPORT_SETTINGS.image.format === 'jpeg' ? 'jpg' : 'png';
        link.download = `${filename}.${extension}`;
        
        if (EXPORT_SETTINGS.image.format === 'jpeg') {
            link.href = canvas.toDataURL('image/jpeg', EXPORT_SETTINGS.image.jpegQuality);
        } else {
            link.href = canvas.toDataURL('image/png');
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification('Image exported successfully!', 'success');

    } catch (error) {
        console.error('Error exporting image:', error);
        showNotification('Error exporting image. Please try again.', 'error');
    }
}

/**
 * Export invoice as PDF
 * @param {HTMLElement} element - Element to export
 * @param {string} filename - Filename for the export
 */
export async function exportAsPDF(element, filename) {
    // Handle the export through Lightning payment
    await lightningPayment.handleExportPayment(performPDFExport, [element, filename]);
}

/**
 * Perform the actual PDF export (called after payment)
 * @param {HTMLElement} element - Element to export
 * @param {string} filename - Filename for the export
 */
async function performPDFExport(element, filename) {
    try {
        // Log current quality settings for transparency
        console.log('📄 PDF Export Settings:', EXPORT_SETTINGS.pdf);
        
        // Import libraries dynamically
        const html2canvas = (await import('html2canvas')).default;
        const { jsPDF } = await import('jspdf');

        // Canvas settings - removed width/height constraints to allow proper scaling
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: EXPORT_SETTINGS.pdf.scale,
            useCORS: true,
            allowTaint: false,
            logging: false,
            scrollX: 0,
            scrollY: 0
        });

        // Create PDF with configurable compression
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: EXPORT_SETTINGS.pdf.compression
        });

        // Use PNG format for proper scaling (like original implementation)
        const imgData = canvas.toDataURL('image/png');
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        
        // Debug logging
        console.log('Canvas dimensions:', {
            width: canvas.width,
            height: canvas.height,
            scale: EXPORT_SETTINGS.pdf.scale,
            elementWidth: element.offsetWidth,
            elementHeight: element.offsetHeight
        });
        
        // Calculate dimensions to fit the image properly
        // Use the original approach - fit to page width and let height be proportional
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Ensure the image doesn't exceed page boundaries
        const finalImgWidth = Math.min(imgWidth, pageWidth);
        const finalImgHeight = Math.min(imgHeight, pageHeight);
        
        console.log('PDF dimensions:', {
            pageWidth,
            pageHeight,
            imgWidth,
            imgHeight,
            finalImgWidth,
            finalImgHeight
        });
        
        // If image is taller than page, we'll need multiple pages
        const compressionMode = EXPORT_SETTINGS.pdf.fastMode ? 'FAST' : 'SLOW';
        
        if (imgHeight <= pageHeight) {
            // Single page - use original dimensions to fill the page properly
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, compressionMode);
        } else {
            // Multiple pages needed - use original dimensions for proper scaling
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, compressionMode);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, compressionMode);
                heightLeft -= pageHeight;
            }
        }

        // Additional compression if enabled
        if (EXPORT_SETTINGS.pdf.compression) {
            pdf.compress = true;
        }
        pdf.save(`${filename}.pdf`);

        showNotification('PDF exported successfully!', 'success');

    } catch (error) {
        console.error('Error exporting PDF:', error);
        showNotification('Error exporting PDF. Please try again.', 'error');
    }
}



/**
 * Print invoice
 * @param {HTMLElement} element - Element to print
 */
export function printInvoice(element) {
    try {
        // Store original styles
        const originalDisplay = document.body.style.display;
        const originalVisibility = document.body.style.visibility;
        
        // Hide everything except the invoice
        document.body.style.display = 'block';
        document.body.style.visibility = 'hidden';
        
        // Show only the invoice element
        element.style.visibility = 'visible';
        element.style.position = 'absolute';
        element.style.left = '0';
        element.style.top = '0';
        element.style.width = '8.5in';
        element.style.height = '11in';
        element.style.margin = '0';
        element.style.padding = '0.5in';
        element.style.backgroundColor = 'white';
        element.style.color = 'black';
        element.style.fontFamily = 'Arial, sans-serif';
        element.style.boxShadow = 'none';
        element.style.border = 'none';
        element.style.overflow = 'visible';
        element.style.zIndex = '9999';
        
        // Add print-specific styles
        const printStyles = document.createElement('style');
        printStyles.textContent = `
            @media print {
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    background: white !important;
                }
                .invoice-preview {
                    box-shadow: none !important;
                    border: none !important;
                    margin: 0 !important;
                    padding: 0.5in !important;
                    width: 8.5in !important;
                    height: 11in !important;
                    max-width: none !important;
                    overflow: visible !important;
                    background: white !important;
                    color: black !important;
                    font-family: Arial, sans-serif !important;
                }
                .lightning-section {
                    break-inside: avoid;
                }
                .qr-code-container {
                    break-inside: avoid;
                }
                .form-panel,
                .app-header,
                .action-buttons,
                .template-controls {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(printStyles);
        
        // Trigger print
        window.print();
        
        // Restore original styles after printing
        setTimeout(() => {
            document.body.style.display = originalDisplay;
            document.body.style.visibility = originalVisibility;
            
            // Reset invoice element styles
            element.style.visibility = '';
            element.style.position = '';
            element.style.left = '';
            element.style.top = '';
            element.style.width = '';
            element.style.height = '';
            element.style.margin = '';
            element.style.padding = '';
            element.style.backgroundColor = '';
            element.style.color = '';
            element.style.fontFamily = '';
            element.style.boxShadow = '';
            element.style.border = '';
            element.style.overflow = '';
            element.style.zIndex = '';
            
            // Remove print styles
            document.head.removeChild(printStyles);
        }, 1000);
        
        showNotification('Print dialog opened!', 'success');
    } catch (error) {
        console.error('Error printing invoice:', error);
        showNotification('Error printing invoice. Please try again.', 'error');
    }
} 