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
        btn.innerHTML = '🖼️ Export Image';
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
        btn.innerHTML = '📄 Export PDF';
        btn.disabled = false;
    }
}



/**
 * Print invoice
 * @param {HTMLElement} element - Element to print
 */
export function printInvoice(element) {
    try {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        const printContent = element.cloneNode(true);
        
        // Add print styles
        const printStyles = `
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 0; 
                    padding: 20px; 
                    background: white; 
                    color: black; 
                }
                .invoice-preview { 
                    box-shadow: none; 
                    border: 1px solid #ccc; 
                    padding: 20px; 
                }
                @media print {
                    body { padding: 0; }
                }
            </style>
        `;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Invoice Print</title>
                    ${printStyles}
                </head>
                <body>
                    ${printContent.outerHTML}
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for content to load then print
        printWindow.onload = function() {
            printWindow.print();
            printWindow.close();
        };
        
        showNotification('Print dialog opened!', 'success');
    } catch (error) {
        console.error('Error printing invoice:', error);
        showNotification('Error printing invoice. Please try again.', 'error');
    }
} 