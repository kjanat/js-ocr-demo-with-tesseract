import { createWorker } from 'tesseract.js';

class OCRService {
  constructor() {
    this.worker = null;
    this.isProcessing = false;
    this.language = 'eng';
  }

  /**
   * Initialize Tesseract worker
   * @param {string} lang - Language code for OCR
   * @returns {Promise<void>}
   */
  async initialize(lang = 'eng') {
    if (this.worker) {
      await this.terminate();
    }

    try {
      console.log('Initializing Tesseract worker...');
      this.language = lang;
      this.worker = await createWorker(lang, 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        },
      });
      console.log('Tesseract worker initialized');
    } catch (error) {
      console.error('Error initializing Tesseract:', error);
      throw new Error('Failed to initialize OCR engine');
    }
  }

  /**
   * Recognize text from an image
   * @param {HTMLCanvasElement|HTMLImageElement|string} image - Image source
   * @returns {Promise<string>} - Extracted text
   */
  async recognize(image) {
    if (!this.worker) {
      await this.initialize();
    }

    if (this.isProcessing) {
      throw new Error('OCR is already processing an image');
    }

    this.isProcessing = true;

    try {
      console.log('Starting OCR recognition...');
      const { data: { text } } = await this.worker.recognize(image);
      console.log('OCR recognition completed');
      this.isProcessing = false;
      return text;
    } catch (error) {
      this.isProcessing = false;
      console.error('Error during OCR recognition:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  /**
   * Recognize text from canvas element
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @returns {Promise<string>} - Extracted text
   */
  async recognizeFromCanvas(canvas) {
    const imageDataUrl = canvas.toDataURL('image/png');
    const image = await this.loadImage(imageDataUrl);
    return this.recognize(image);
  }

  /**
   * Load an image from a URL
   * @param {string} url - Image URL
   * @returns {Promise<HTMLImageElement>}
   */
  loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', (err) => reject(err));
      img.src = url;
    });
  }

  /**
   * Terminate the worker
   * @returns {Promise<void>}
   */
  async terminate() {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
      this.isProcessing = false;
      console.log('Tesseract worker terminated');
    }
  }

  /**
   * Check if OCR is currently processing
   * @returns {boolean}
   */
  isOCRProcessing() {
    return this.isProcessing;
  }

  /**
   * Get current language
   * @returns {string}
   */
  getCurrentLanguage() {
    return this.language;
  }
}

export default new OCRService();
