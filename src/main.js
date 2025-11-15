// @ts-check
import './styles.css';
import DarkModeToggle from './components/darkModeToggle.js';
import PDFViewer from './components/pdfViewer.js';
import TextExtractor from './components/textExtractor.js';

/**
 * Main application class that initializes and coordinates all components
 * @class
 */
class App {
  constructor() {
    /** @type {PDFViewer | null} */
    this.pdfViewer = null;

    /** @type {TextExtractor | null} */
    this.textExtractor = null;

    /** @type {DarkModeToggle | null} */
    this.darkModeToggle = null;

    this.initialize();
  }

  /**
   * Initialize the application
   * @returns {void}
   */
  initialize() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupApp());
    } else {
      this.setupApp();
    }
  }

  /**
   * Set up the application by initializing all components
   * @returns {void}
   */
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
      if (this.textExtractor) {
        await this.textExtractor.extractText();
      }
    });

    console.log('Application initialized successfully!');
  }
}

// Initialize the application
new App();
