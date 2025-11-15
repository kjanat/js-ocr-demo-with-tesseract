// @ts-check
import ocrService from '../services/ocrService.js';

/**
 * Text Extractor component for performing OCR on canvas images
 * @class
 */
class TextExtractor {
  /**
   * Create a text extractor instance
   * @param {HTMLCanvasElement | null} canvas - Canvas element to extract text from
   */
  constructor(canvas) {
    /** @type {HTMLCanvasElement | null} */
    this.canvas = canvas;

    /** @type {HTMLTextAreaElement | null} */
    this.textarea = /** @type {HTMLTextAreaElement | null} */ (
      document.getElementById('extracted-text')
    );

    /** @type {boolean} */
    this.isExtracting = false;
  }

  /**
   * Extract text from the canvas using OCR
   * @returns {Promise<void>}
   */
  async extractText() {
    if (this.isExtracting) {
      console.log('Text extraction already in progress');
      return;
    }

    if (!this.canvas) {
      console.error('No canvas element provided');
      return;
    }

    try {
      this.isExtracting = true;
      this.showExtractionStatus('Extracting text...');

      const text = await ocrService.recognizeFromCanvas(this.canvas);
      this.displayText(text);
      this.showExtractionStatus('Extraction complete!');

      // Clear status after 2 seconds
      setTimeout(() => this.clearExtractionStatus(), 2000);
    } catch (error) {
      console.error('Error extracting text:', error);
      this.showExtractionStatus('Failed to extract text', true);
      setTimeout(() => this.clearExtractionStatus(), 3000);
    } finally {
      this.isExtracting = false;
    }
  }

  /**
   * Display extracted text in textarea
   * @param {string} text - Text to display
   * @returns {void}
   */
  displayText(text) {
    if (this.textarea) {
      this.textarea.value = text;
    }
  }

  /**
   * Show extraction status message
   * @param {string} message - Status message to show
   * @param {boolean} [isError=false] - Whether the status is an error
   * @returns {void}
   */
  showExtractionStatus(message, isError = false) {
    // Update placeholder with status
    if (this.textarea) {
      if (isError) {
        this.textarea.placeholder = `❌ ${message}`;
      } else {
        this.textarea.placeholder = `⏳ ${message}`;
      }
    }
  }

  /**
   * Clear extraction status message
   * @returns {void}
   */
  clearExtractionStatus() {
    if (this.textarea) {
      this.textarea.placeholder = 'Extracted text will appear here...';
    }
  }

  /**
   * Clear the extracted text
   * @returns {void}
   */
  clearText() {
    if (this.textarea) {
      this.textarea.value = '';
    }
  }

  /**
   * Get the current extracted text
   * @returns {string} The extracted text or empty string
   */
  getText() {
    return this.textarea ? this.textarea.value : '';
  }
}

export default TextExtractor;
