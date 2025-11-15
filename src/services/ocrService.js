// @ts-check
import { createWorker } from 'tesseract.js';

/**
 * @typedef {import('tesseract.js').Worker} TesseractWorker
 * @typedef {import('tesseract.js').RecognizeResult} RecognizeResult
 */

/**
 * @typedef {Object} LoggerMessage
 * @property {string} status - Current status of the OCR operation
 * @property {number} progress - Progress value between 0 and 1
 */

/**
 * Service for handling OCR operations using Tesseract.js
 * @class
 */
class OCRService {
  constructor() {
    /** @type {TesseractWorker | null} */
    this.worker = null;

    /** @type {boolean} */
    this.isProcessing = false;

    /** @type {string} */
    this.language = 'eng';
  }

  /**
   * Initialize Tesseract worker
   * @param {string} [lang='eng'] - Language code for OCR (e.g., 'eng', 'spa', 'fra')
   * @returns {Promise<void>}
   * @throws {Error} If worker initialization fails
   */
  async initialize(lang = 'eng') {
    if (this.worker) {
      await this.terminate();
    }

    try {
      console.log('Initializing Tesseract worker...');
      this.language = lang;
      this.worker = await createWorker(lang, 1, {
        logger: (/** @type {LoggerMessage} */ m) => {
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
   * @param {HTMLCanvasElement | HTMLImageElement | string} image - Image source
   * @returns {Promise<string>} Extracted text from the image
   * @throws {Error} If OCR is already processing or recognition fails
   */
  async recognize(image) {
    if (!this.worker) {
      await this.initialize();
    }

    if (!this.worker) {
      throw new Error('OCR worker initialization failed');
    }

    if (this.isProcessing) {
      throw new Error('OCR is already processing an image');
    }

    this.isProcessing = true;

    try {
      console.log('Starting OCR recognition...');
      const result = await this.worker.recognize(image);
      const text = result.data.text;
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
   * @param {HTMLCanvasElement} canvas - Canvas element containing the image
   * @returns {Promise<string>} Extracted text from the canvas
   * @throws {Error} If canvas is invalid or recognition fails
   */
  async recognizeFromCanvas(canvas) {
    const imageDataUrl = canvas.toDataURL('image/png');
    const image = await this.loadImage(imageDataUrl);
    return this.recognize(image);
  }

  /**
   * Load an image from a URL
   * @param {string} url - Image URL or data URL
   * @returns {Promise<HTMLImageElement>} Loaded image element
   * @throws {Error} If image fails to load
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
   * Terminate the worker and free resources
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
   * @returns {boolean} True if processing, false otherwise
   */
  isOCRProcessing() {
    return this.isProcessing;
  }

  /**
   * Get current language setting
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.language;
  }
}

export default new OCRService();
