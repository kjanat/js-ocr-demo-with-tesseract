# JS OCR Demo with Tesseract

A modern, feature-rich web application for Optical Character Recognition (OCR) using Tesseract.js and PDF.js. Extract text from PDF documents directly in your browser with a beautiful, responsive interface built with Vite and TailwindCSS.

## Features

- **PDF Support**: Upload and view PDF documents with built-in navigation
- **OCR Text Extraction**: Automatically extract text from PDF pages using Tesseract.js
- **Modern UI/UX**: Beautiful, responsive design with dark mode support
- **Fast Performance**: Built with Vite for lightning-fast development and optimized production builds
- **Modular Architecture**: Clean, maintainable code structure with separate services and components
- **Zero Server Required**: Runs entirely in the browser with no backend needed

## Technologies Used

- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling
- **[Tesseract.js](https://tesseract.projectnaptha.com/)**: Pure JavaScript OCR library
- **[PDF.js](https://mozilla.github.io/pdf.js/)**: PDF rendering in JavaScript
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **Modern JavaScript (ES6+)**: Clean, modular code with ES modules

## Project Structure

```
js-ocr-demo-with-tesseract/
├── src/
│   ├── components/          # UI components
│   │   ├── pdfViewer.js    # PDF rendering and navigation
│   │   ├── textExtractor.js # OCR text extraction
│   │   └── darkModeToggle.js # Theme switching
│   ├── services/            # Business logic
│   │   ├── pdfService.js   # PDF document handling
│   │   └── ocrService.js   # Tesseract OCR integration
│   ├── utils/               # Utility functions
│   │   ├── fileUtils.js    # File handling helpers
│   │   └── themeUtils.js   # Theme management
│   ├── main.js              # Application entry point
│   └── styles.css           # Global styles and Tailwind
├── public/                  # Static assets
├── index.html               # Main HTML file
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # TailwindCSS configuration
└── package.json             # Dependencies and scripts
```

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/js-ocr-demo-with-tesseract.git
   cd js-ocr-demo-with-tesseract
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Start Development Server

Run the development server with hot module replacement:

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Usage

1. **Upload a PDF**: Click on "Choose a PDF file" or drag and drop a PDF document
2. **View Pages**: Use the Previous/Next buttons to navigate through pages
3. **Extract Text**: Text is automatically extracted from each page using OCR
4. **Copy Text**: Use the "Copy Text" button to copy extracted text to clipboard
5. **Toggle Dark Mode**: Click the dark mode button in the header to switch themes

## Features in Detail

### PDF Viewer
- Smooth page navigation with Previous/Next buttons
- Page number indicator
- Responsive canvas rendering
- Automatic scaling for optimal viewing

### OCR Engine
- Powered by Tesseract.js for accurate text recognition
- Automatic text extraction on page render
- Progress feedback during extraction
- Support for multiple languages (default: English)

### Modern UI
- Responsive design that works on all devices
- Dark mode with persistent theme preference
- Smooth animations and transitions
- Intuitive controls and clear visual feedback

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Any modern browser with ES6+ support

## Performance Optimization

- Code splitting and lazy loading
- Optimized bundle size with Vite
- Tree shaking for minimal dependencies
- Efficient PDF rendering and caching

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Tesseract.js](https://tesseract.projectnaptha.com/) - OCR engine
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
