// @ts-check
import * as pdfjsLib from 'pdfjs-dist';

/**
 * @typedef {import('pdfjs-dist').PDFDocumentProxy} PDFDocumentProxy
 * @typedef {import('pdfjs-dist').PDFPageProxy} PDFPageProxy
 */

/**
 * @typedef {Object} PageRenderResult
 * @property {number} pageNum - The page number that was rendered
 * @property {number} totalPages - Total number of pages in the document
 */

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

/**
 * Service for handling PDF document operations including loading and rendering
 * @class
 */
class PDFService {
  constructor() {
    /** @type {PDFDocumentProxy | null} */
    this.pdfDoc = null;

    /** @type {number} */
    this.currentPage = 1;

    /** @type {boolean} */
    this.isRendering = false;

    /** @type {number | null} */
    this.pendingPage = null;
  }

  /**
   * Load a PDF document from file data
   * @param {string | ArrayBuffer | Uint8Array} fileData - PDF file data
   * @returns {Promise<PDFDocumentProxy>} The loaded PDF document
   * @throws {Error} If PDF fails to load
   */
  async loadPDF(fileData) {
    try {
      const loadingTask = pdfjsLib.getDocument(fileData);
      this.pdfDoc = await loadingTask.promise;
      this.currentPage = 1;
      console.log('PDF loaded successfully:', this.pdfDoc.numPages, 'pages');
      return this.pdfDoc;
    } catch (error) {
      console.error('Error loading PDF:', error);
      throw new Error('Failed to load PDF document');
    }
  }

  /**
   * Render a specific page to a canvas
   * @param {number} pageNum - Page number to render (1-indexed)
   * @param {HTMLCanvasElement} canvas - Canvas element to render to
   * @param {number} [scale=1.5] - Scale factor for rendering
   * @returns {Promise<PageRenderResult | undefined>} Render result with page info
   * @throws {Error} If no PDF is loaded or rendering fails
   */
  async renderPage(pageNum, canvas, scale = 1.5) {
    if (!this.pdfDoc) {
      throw new Error('No PDF document loaded');
    }

    if (this.isRendering) {
      this.pendingPage = pageNum;
      return;
    }

    this.isRendering = true;
    this.currentPage = pageNum;

    try {
      const page = await this.pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Failed to get canvas 2D context');
      }

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      this.isRendering = false;

      // Render pending page if exists
      if (this.pendingPage !== null) {
        const pending = this.pendingPage;
        this.pendingPage = null;
        await this.renderPage(pending, canvas, scale);
      }

      return { pageNum, totalPages: this.pdfDoc.numPages };
    } catch (error) {
      this.isRendering = false;
      console.error('Error rendering page:', error);
      throw new Error('Failed to render PDF page');
    }
  }

  /**
   * Navigate to the next page
   * @returns {number | null} New page number or null if already at last page
   */
  nextPage() {
    if (!this.pdfDoc || this.currentPage >= this.pdfDoc.numPages) {
      return null;
    }
    return ++this.currentPage;
  }

  /**
   * Navigate to the previous page
   * @returns {number | null} New page number or null if already at first page
   */
  previousPage() {
    if (!this.pdfDoc || this.currentPage <= 1) {
      return null;
    }
    return --this.currentPage;
  }

  /**
   * Get current page number
   * @returns {number} Current page number (1-indexed)
   */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
   * Get total number of pages in the document
   * @returns {number} Total pages, or 0 if no document loaded
   */
  getTotalPages() {
    return this.pdfDoc ? this.pdfDoc.numPages : 0;
  }

  /**
   * Reset the PDF service to initial state
   * @returns {void}
   */
  reset() {
    this.pdfDoc = null;
    this.currentPage = 1;
    this.isRendering = false;
    this.pendingPage = null;
  }
}

export default new PDFService();
