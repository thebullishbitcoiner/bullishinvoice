// Export functionality for PDF and image generation

import { showNotification } from './utils.js';

/**
 * Export invoice as image
 * @param {HTMLElement} element - Element to export
 * @param {string} filename - Filename for the export
 */
export async function exportAsImage(element, filename) {
    try {
        // Show loading state
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Generating...';
        btn.disabled = true;

        // Import html2canvas dynamically
        const html2canvas = (await import('html2canvas')).default;
        
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: false,
            logging: false,
            scrollX: 0,
            scrollY: 0
        });

        // Create download link
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Restore button
        btn.innerHTML = originalText;
        btn.disabled = false;

        showNotification('Image exported successfully!', 'success');

    } catch (error) {
        console.error('Error exporting image:', error);
        showNotification('Error exporting image. Please try again.', 'error');

        // Restore button
        const btn = event.target;
        btn.innerHTML = 'Export Image';
        btn.disabled = false;
    }
}

/**
 * Export invoice as PDF
 * @param {HTMLElement} element - Element to export
 * @param {string} filename - Filename for the export
 */
export async function exportAsPDF(element, filename) {
    try {
        // Show loading state
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Generating...';
        btn.disabled = true;

        // Import libraries dynamically
        const html2canvas = (await import('html2canvas')).default;
        const { jsPDF } = await import('jspdf');

        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: false,
            logging: false,
            scrollX: 0,
            scrollY: 0
        });

        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgData = canvas.toDataURL('image/png');
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        
        // Calculate dimensions to fit the image properly
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // If image is taller than page, we'll need multiple pages
        if (imgHeight <= pageHeight) {
            // Single page - center the image
            const yOffset = (pageHeight - imgHeight) / 2;
            pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
        } else {
            // Multiple pages needed
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
        }

        pdf.save(`${filename}.pdf`);

        // Restore button
        btn.innerHTML = originalText;
        btn.disabled = false;

        showNotification('PDF exported successfully!', 'success');

    } catch (error) {
        console.error('Error exporting PDF:', error);
        showNotification('Error exporting PDF. Please try again.', 'error');

        // Restore button
        const btn = event.target;
        btn.innerHTML = 'Export PDF';
        btn.disabled = false;
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