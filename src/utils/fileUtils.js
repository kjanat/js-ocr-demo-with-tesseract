/**
 * Read a file as a Data URL
 * @param {File} file - File object to read
 * @returns {Promise<string>} - Data URL string
 */
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = () => reject(new Error('Failed to read file'));
    fileReader.readAsDataURL(file);
  });
}

/**
 * Read a file as an ArrayBuffer
 * @param {File} file - File object to read
 * @returns {Promise<ArrayBuffer>} - ArrayBuffer
 */
export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = () => reject(new Error('Failed to read file'));
    fileReader.readAsArrayBuffer(file);
  });
}

/**
 * Validate if file is a PDF
 * @param {File} file - File object to validate
 * @returns {boolean}
 */
export function isPDFFile(file) {
  return file && file.type === 'application/pdf';
}

/**
 * Format file size to human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
