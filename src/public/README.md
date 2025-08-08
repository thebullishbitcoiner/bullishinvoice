# Media Files Directory

This directory contains static media files for the bullishInvoice application.

## Directory Structure

```
public/
├── images/          # Images and graphics (including logo.png)
└── manifest.json    # Web app manifest for PWA support
```

## Logo Requirements

### Required Logo
Place the following logo in the `images/` directory:

- `logo.png` - 512x512 PNG (used for all icon purposes)

### Logo Specifications
- **Format**: PNG
- **Size**: 512x512 pixels (recommended)
- **Background**: Transparent or solid color
- **Colors**: Use the app's theme color (#ff9900) as primary
- **Style**: Consistent with the app's design language

## Usage

### In HTML
The logo is automatically referenced in the HTML head section:

```html
<link rel="icon" type="image/png" href="/bullishinvoice/images/logo.png">
<link rel="apple-touch-icon" href="/bullishinvoice/images/logo.png">
```

### In CSS
Reference the logo in CSS using relative paths:

```css
.logo {
    background-image: url('/bullishinvoice/images/logo.png');
}
```

### In JavaScript
Reference the logo in JavaScript:

```javascript
const logoPath = '/bullishinvoice/images/logo.png';
```

## Build Process

Files in the `public/` directory are:
- Copied as-is to the build output
- Not processed by Vite
- Served with the same path structure
- Available at runtime with the `/bullishinvoice/` base path

## Notes

- All paths should include the `/bullishinvoice/` base path for production
- The logo should be optimized for web use (compressed PNG)
- Consider using WebP format for better compression (with PNG fallback)
- The same logo.png file is used for favicon, PWA icons, and Apple touch icon
