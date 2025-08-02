// Storage management for form persistence and templates

const STORAGE_KEYS = {
    FORM_DATA: 'bullish_invoice_form_data',
    TEMPLATES: 'bullish_invoice_templates',
    SETTINGS: 'bullish_invoice_settings'
};

/**
 * Save form data to localStorage
 * @param {Object} formData - Form data to save
 */
export function saveFormData(formData) {
    try {
        localStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(formData));
    } catch (error) {
        console.error('Error saving form data:', error);
    }
}

/**
 * Load form data from localStorage
 * @returns {Object|null} Form data or null if not found
 */
export function loadFormData() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.FORM_DATA);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading form data:', error);
        return null;
    }
}

/**
 * Clear saved form data
 */
export function clearFormData() {
    try {
        localStorage.removeItem(STORAGE_KEYS.FORM_DATA);
    } catch (error) {
        console.error('Error clearing form data:', error);
    }
}

/**
 * Save a template
 * @param {string} name - Template name
 * @param {Object} templateData - Template data
 */
export function saveTemplate(name, templateData) {
    try {
        const templates = loadTemplates();
        templates[name] = {
            ...templateData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
    } catch (error) {
        console.error('Error saving template:', error);
    }
}

/**
 * Load all templates
 * @returns {Object} Object with template names as keys
 */
export function loadTemplates() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading templates:', error);
        return {};
    }
}

/**
 * Load a specific template
 * @param {string} name - Template name
 * @returns {Object|null} Template data or null if not found
 */
export function loadTemplate(name) {
    try {
        const templates = loadTemplates();
        return templates[name] || null;
    } catch (error) {
        console.error('Error loading template:', error);
        return null;
    }
}

/**
 * Delete a template
 * @param {string} name - Template name to delete
 */
export function deleteTemplate(name) {
    try {
        const templates = loadTemplates();
        delete templates[name];
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
    } catch (error) {
        console.error('Error deleting template:', error);
    }
}

/**
 * Get all template names
 * @returns {string[]} Array of template names
 */
export function getTemplateNames() {
    try {
        const templates = loadTemplates();
        return Object.keys(templates);
    } catch (error) {
        console.error('Error getting template names:', error);
        return [];
    }
}

/**
 * Save application settings
 * @param {Object} settings - Settings to save
 */
export function saveSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

/**
 * Load application settings
 * @returns {Object} Settings object
 */
export function loadSettings() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? JSON.parse(data) : getDefaultSettings();
    } catch (error) {
        console.error('Error loading settings:', error);
        return getDefaultSettings();
    }
}

/**
 * Get default settings
 * @returns {Object} Default settings
 */
function getDefaultSettings() {
    return {
        autoSave: true,
        autoSaveInterval: 5000, // 5 seconds
        defaultInvoicePrefix: 'INV',
        defaultCurrency: 'sats',
        theme: 'dark'
    };
}

/**
 * Export all data as JSON
 * @returns {string} JSON string of all data
 */
export function exportAllData() {
    try {
        const data = {
            formData: loadFormData(),
            templates: loadTemplates(),
            settings: loadSettings(),
            exportedAt: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error exporting data:', error);
        return null;
    }
}

/**
 * Import data from JSON
 * @param {string} jsonData - JSON string to import
 * @returns {boolean} Success status
 */
export function importData(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        
        if (data.formData) {
            saveFormData(data.formData);
        }
        
        if (data.templates) {
            localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(data.templates));
        }
        
        if (data.settings) {
            saveSettings(data.settings);
        }
        
        return true;
    } catch (error) {
        console.error('Error importing data:', error);
        return false;
    }
} 