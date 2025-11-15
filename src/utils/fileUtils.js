// @ts-check

/**
 * Read a file as a Data URL
 * @param {File} file - File object to read
 * @returns {Promise<string>} Data URL string representation of the file
 * @throws {Error} If file reading fails
 */
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        resolve(fileReader.result);
      } else {
        reject(new Error('Failed to read file as data URL'));
      }
    };
    fileReader.onerror = () => reject(new Error('Failed to read file'));
    fileReader.readAsDataURL(file);
  });
}

/**
 * Read a file as an ArrayBuffer
 * @param {File} file - File object to read
 * @returns {Promise<ArrayBuffer>} ArrayBuffer representation of the file
 * @throws {Error} If file reading fails
 */
export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result instanceof ArrayBuffer) {
        resolve(fileReader.result);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer'));
      }
    };
    fileReader.onerror = () => reject(new Error('Failed to read file'));
    fileReader.readAsArrayBuffer(file);
  });
}

/**
 * Validate if file is a PDF
 * @param {File} file - File object to validate
 * @returns {boolean} True if file is a PDF, false otherwise
 */
export function isPDFFile(file) {
  return file && file.type === 'application/pdf';
}

/**
 * Format file size to human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / k ** i) * 100) / 100} ${sizes[i]}`;
}
