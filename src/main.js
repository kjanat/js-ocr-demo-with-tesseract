import './styles.css';
import PDFViewer from './components/pdfViewer.js';
import TextExtractor from './components/textExtractor.js';
import DarkModeToggle from './components/darkModeToggle.js';

class App {
  constructor() {
    this.pdfViewer = null;
    this.textExtractor = null;
    this.darkModeToggle = null;
    this.initialize();
  }

  initialize() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupApp());
    } else {
      this.setupApp();
    }
  }

  setupApp() {
    console.log('Initializing OCR Application...');

    // Initialize dark mode toggle
    this.darkModeToggle = new DarkModeToggle();

    // Initialize PDF viewer
    this.pdfViewer = new PDFViewer();

    // Initialize text extractor
    const canvas = this.pdfViewer.getCanvas();
    this.textExtractor = new TextExtractor(canvas);

    // Set callback to extract text when page is rendered
    this.pdfViewer.setOnPageRenderCallback(async () => {
      await this.textExtractor.extractText();
    });

    console.log('Application initialized successfully!');
  }
}

// Initialize the application
new App();
