// Utility functions for the invoice generator

/**
 * Format number with spaces
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Generate a unique invoice number
 * @param {string} prefix - Invoice number prefix
 * @returns {string} Generated invoice number
 */
export function generateInvoiceNumber(prefix = 'INV') {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
}



/**
 * Get default dates for invoice
 * @returns {Object} Object with invoiceDate
 */
export function getDefaultDates() {
    const today = new Date();
    
    return {
        invoiceDate: today.toISOString().split('T')[0]
    };
}

/**
 * Calculate total amount from quantity and rate
 * @param {number} quantity - Quantity
 * @param {number} rate - Rate per unit
 * @returns {number} Total amount
 */
export function calculateTotal(quantity, rate) {
    return (parseFloat(quantity) || 0) * (parseFloat(rate) || 0);
}

/**
 * Show notification message
 * @param {string} message - Message to show
 * @param {string} type - Type of notification (success, error, warning)
 */
export function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '1000',
        transform: 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
        success: '#ff9900',
        error: '#ff9900',
        warning: '#ff9900'
    };
    notification.style.backgroundColor = colors[type] || colors.success;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Sanitize HTML content to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
} 