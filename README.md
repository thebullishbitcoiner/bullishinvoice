# ⚡ Lightning Invoice Generator

A modern, feature-rich invoice generator specifically designed for Bitcoin Lightning Network payments. Built with vanilla JavaScript and Vite for optimal performance and developer experience.

## ✨ Features

### Core Functionality
- **Real-time Preview**: See your invoice update as you type
- **Lightning Network Integration**: Support for Lightning Network invoices with QR code generation
- **Multiple Export Formats**: PDF and PNG image export
- **Print Support**: Optimized print layout
- **Responsive Design**: Works on desktop and mobile devices

### Enhanced Features
- **Form Persistence**: Automatically saves your work to localStorage
- **Template System**: Save and load invoice templates
- **Auto-save**: Never lose your work with automatic saving
- **Invoice Number Generation**: Automatic unique invoice number generation
- **Input Validation**: Lightning invoice format validation
- **Error Handling**: Comprehensive error handling with user notifications
- **QR Code Generation**: Automatic Bitcoin QR code for Lightning invoices

### Export Options
- **PDF Export**: High-quality PDF generation with proper formatting
- **Image Export**: PNG format with high resolution (2x scale)
- **Print**: Browser print functionality with optimized layout

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bullishinvoice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
bullishinvoice/
├── src/
│   ├── index.html          # Main HTML file
│   ├── styles/
│   │   └── main.css        # All styles
│   └── js/
│       ├── app.js          # Main application logic
│       ├── utils.js        # Utility functions
│       ├── storage.js      # Local storage management
│       └── export.js       # Export functionality
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md              # This file
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Organization

The application is organized into modules:

- **`app.js`**: Main application class that orchestrates everything
- **`utils.js`**: Utility functions for formatting, validation, and common operations
- **`storage.js`**: Local storage management for form persistence and templates
- **`export.js`**: Export functionality for various formats

## 🎨 Customization

### Styling
All styles are in `src/styles/main.css`. The design uses CSS custom properties and can be easily customized.

### Templates
Templates are stored in localStorage and can be managed through the UI. You can save and load different invoice templates for quick reuse.

### Settings
Application settings are stored in localStorage and include:
- Auto-save preferences
- Default invoice prefix
- Form data persistence

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` file contains build and development server configuration. You can modify:
- Development server port
- Build output directory
- Asset optimization settings

### Dependencies
Key dependencies:
- **html2canvas**: For PDF and image export
- **jspdf**: For PDF generation
- **bitcoin-qr**: For Lightning invoice QR code generation
- **vite**: Build tool and development server

## 🚀 Deployment

### GitHub Pages (Recommended)
This project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy on pushes to the `main` branch

2. **Your site will be available at**: `https://[username].github.io/bullishinvoice/`

3. **Automatic Deployment**: Every push to the `main` branch triggers a new deployment

### Manual Deployment
For other static hosting services:

- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your repository
- **AWS S3**: Upload the `dist/` contents

### Build Output
The build process creates optimized files in the `dist/` directory:
- Minified CSS and JavaScript
- Optimized assets
- HTML file ready for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- Uses [html2canvas](https://html2canvas.hertzen.com/) for export functionality
- Styled with modern CSS Grid and Flexbox
- Bitcoin Lightning Network integration

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ⚡ for the Bitcoin community** 