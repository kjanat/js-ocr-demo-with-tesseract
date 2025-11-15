// @ts-check
import { DARK_THEME, initializeTheme, toggleTheme } from '../utils/themeUtils.js';

/**
 * Dark Mode Toggle component for managing theme switching
 * @class
 */
class DarkModeToggle {
  constructor() {
    /** @type {HTMLButtonElement | null} */
    this.button = /** @type {HTMLButtonElement | null} */ (
      document.getElementById('darkModeToggle')
    );
    this.initialize();
  }

  /**
   * Initialize the dark mode toggle
   * @returns {void}
   */
  initialize() {
    if (!this.button) return;

    // Initialize theme from localStorage
    const currentTheme = initializeTheme();
    this.updateButtonText(currentTheme);

    // Add click handler
    this.button.addEventListener('click', () => {
      const newTheme = toggleTheme();
      this.updateButtonText(newTheme);
    });
  }

  /**
   * Update button text and icon based on theme
   * @param {'dark' | 'light'} theme - Current theme
   * @returns {void}
   */
  updateButtonText(theme) {
    if (!this.button) return;

    if (theme === DARK_THEME) {
      this.button.innerHTML = `
        <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        Light Mode
      `;
    } else {
      this.button.innerHTML = `
        <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
        Dark Mode
      `;
    }
  }
}

export default DarkModeToggle;
