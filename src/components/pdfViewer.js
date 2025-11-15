// @ts-check
import pdfService from '../services/pdfService.js';
import { readFileAsDataURL } from '../utils/fileUtils.js';

/**
 * @typedef {() => Promise<void>} PageRenderCallback
 */

/**
 * PDF Viewer component for displaying and navigating PDF documents
 * @class
 */
class PDFViewer {
  constructor() {
    /** @type {HTMLCanvasElement | null} */
    this.canvas = /** @type {HTMLCanvasElement | null} */ (document.getElementById('canvas'));

    /** @type {HTMLInputElement | null} */
    this.fileInput = /** @type {HTMLInputElement | null} */ (document.getElementById('uploadPDF'));

    /** @type {HTMLButtonElement | null} */
    this.prevButton = /** @type {HTMLButtonElement | null} */ (document.getElementById('prev'));

    /** @type {HTMLButtonElement | null} */
    this.nextButton = /** @type {HTMLButtonElement | null} */ (document.getElementById('next'));

    /** @type {HTMLElement | null} */
    this.pageNumSpan = document.getElementById('page_num');

    /** @type {HTMLElement | null} */
    this.pageCountSpan = document.getElementById('page_count');

    /** @type {HTMLElement | null} */
    this.pagination = document.getElementById('pagination');

    /** @type {PageRenderCallback | null} */
    this.onPageRenderCallback = null;

    this.initialize();
  }

  /**
   * Initialize event listeners and UI state
   * @returns {void}
   */
  initialize() {
    if (!this.fileInput) return;

    // File upload handler
    this.fileInput.addEventListener('change', async (e) => {
      await this.handleFileUpload(/** @type {Event} */ (e));
    });

    // Navigation handlers
    this.prevButton?.addEventListener('click', () => this.previousPage());
    this.nextButton?.addEventListener('click', () => this.nextPage());

    // Initially disable navigation buttons
    this.updateNavigationState();
  }

  /**
   * Handle file upload event
   * @param {Event} event - File input change event
   * @returns {Promise<void>}
   */
  async handleFileUpload(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    const file = target.files?.[0];
    if (!file) return;

    try {
      this.showLoading();
      const fileData = await readFileAsDataURL(file);
      await pdfService.loadPDF(fileData);
      await this.renderCurrentPage();
      this.updatePagination();
      this.updateNavigationState();
    } catch (error) {
      console.error('Error loading PDF:', error);
      this.showError('Failed to load PDF file. Please try another file.');
    }
  }

  /**
   * Render the current PDF page
   * @returns {Promise<void>}
   */
  async renderCurrentPage() {
    if (!this.canvas) return;

    try {
      const currentPage = pdfService.getCurrentPage();
      await pdfService.renderPage(currentPage, this.canvas);
      this.updatePagination();

      // Call callback if set (e.g., for OCR extraction)
      if (this.onPageRenderCallback) {
        await this.onPageRenderCallback();
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      this.showError('Failed to render PDF page.');
    }
  }

  /**
   * Navigate to next page
   * @returns {Promise<void>}
   */
  async nextPage() {
    const newPage = pdfService.nextPage();
    if (newPage !== null) {
      await this.renderCurrentPage();
      this.updateNavigationState();
    }
  }

  /**
   * Navigate to previous page
   * @returns {Promise<void>}
   */
  async previousPage() {
    const newPage = pdfService.previousPage();
    if (newPage !== null) {
      await this.renderCurrentPage();
      this.updateNavigationState();
    }
  }

  /**
   * Update pagination UI display
   * @returns {void}
   */
  updatePagination() {
    const currentPage = pdfService.getCurrentPage();
    const totalPages = pdfService.getTotalPages();

    if (totalPages > 0 && this.pageNumSpan && this.pageCountSpan) {
      this.pageNumSpan.textContent = currentPage.toString();
      this.pageCountSpan.textContent = totalPages.toString();
      this.pagination?.classList.remove('hidden');
    } else {
      this.pagination?.classList.add('hidden');
    }
  }

  /**
   * Update navigation button states
   * @returns {void}
   */
  updateNavigationState() {
    const currentPage = pdfService.getCurrentPage();
    const totalPages = pdfService.getTotalPages();

    if (this.prevButton) {
      this.prevButton.disabled = currentPage <= 1;

      // Update button styles for disabled state
      if (this.prevButton.disabled) {
        this.prevButton.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        this.prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }

    if (this.nextButton) {
      this.nextButton.disabled = currentPage >= totalPages || totalPages === 0;

      // Update button styles for disabled state
      if (this.nextButton.disabled) {
        this.nextButton.classList.add('opacity-50', 'cursor-not-allowed');
      } else {
        this.nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }
  }

  /**
   * Show loading state
   * @returns {void}
   */
  showLoading() {
    // Could add a loading spinner here
    console.log('Loading PDF...');
  }

  /**
   * Show error message
   * @param {string} message - Error message to display
   * @returns {void}
   */
  showError(message) {
    alert(message);
  }

  /**
   * Set callback function to be called after page render
   * @param {PageRenderCallback} callback - Callback function
   * @returns {void}
   */
  setOnPageRenderCallback(callback) {
    this.onPageRenderCallback = callback;
  }

  /**
   * Get the canvas element
   * @returns {HTMLCanvasElement | null} The canvas element
   */
  getCanvas() {
    return this.canvas;
  }
}

export default PDFViewer;
