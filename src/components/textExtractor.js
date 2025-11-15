import ocrService from '../services/ocrService.js';

class TextExtractor {
  constructor(canvas) {
    this.canvas = canvas;
    this.textarea = document.getElementById('extracted-text');
    this.isExtracting = false;
  }

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

  displayText(text) {
    if (this.textarea) {
      this.textarea.value = text;
    }
  }

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

  clearExtractionStatus() {
    if (this.textarea) {
      this.textarea.placeholder = 'Extracted text will appear here...';
    }
  }

  clearText() {
    if (this.textarea) {
      this.textarea.value = '';
    }
  }

  getText() {
    return this.textarea ? this.textarea.value : '';
  }
}

export default TextExtractor;
