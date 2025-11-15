import pdfService from '../services/pdfService.js';
import { readFileAsDataURL } from '../utils/fileUtils.js';

class PDFViewer {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.fileInput = document.getElementById('uploadPDF');
    this.prevButton = document.getElementById('prev');
    this.nextButton = document.getElementById('next');
    this.pageNumSpan = document.getElementById('page_num');
    this.pageCountSpan = document.getElementById('page_count');
    this.pagination = document.getElementById('pagination');
    this.onPageRenderCallback = null;

    this.initialize();
  }

  initialize() {
    // File upload handler
    this.fileInput.addEventListener('change', async (e) => {
      await this.handleFileUpload(e);
    });

    // Navigation handlers
    this.prevButton.addEventListener('click', () => this.previousPage());
    this.nextButton.addEventListener('click', () => this.nextPage());

    // Initially disable navigation buttons
    this.updateNavigationState();
  }

  async handleFileUpload(event) {
    const file = event.target.files[0];
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

  async renderCurrentPage() {
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

  async nextPage() {
    const newPage = pdfService.nextPage();
    if (newPage !== null) {
      await this.renderCurrentPage();
      this.updateNavigationState();
    }
  }

  async previousPage() {
    const newPage = pdfService.previousPage();
    if (newPage !== null) {
      await this.renderCurrentPage();
      this.updateNavigationState();
    }
  }

  updatePagination() {
    const currentPage = pdfService.getCurrentPage();
    const totalPages = pdfService.getTotalPages();

    if (totalPages > 0) {
      this.pageNumSpan.textContent = currentPage;
      this.pageCountSpan.textContent = totalPages;
      this.pagination.classList.remove('hidden');
    } else {
      this.pagination.classList.add('hidden');
    }
  }

  updateNavigationState() {
    const currentPage = pdfService.getCurrentPage();
    const totalPages = pdfService.getTotalPages();

    this.prevButton.disabled = currentPage <= 1;
    this.nextButton.disabled = currentPage >= totalPages || totalPages === 0;

    // Update button styles for disabled state
    if (this.prevButton.disabled) {
      this.prevButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      this.prevButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    if (this.nextButton.disabled) {
      this.nextButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      this.nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }

  showLoading() {
    // Could add a loading spinner here
    console.log('Loading PDF...');
  }

  showError(message) {
    alert(message);
  }

  setOnPageRenderCallback(callback) {
    this.onPageRenderCallback = callback;
  }

  getCanvas() {
    return this.canvas;
  }
}

export default PDFViewer;
