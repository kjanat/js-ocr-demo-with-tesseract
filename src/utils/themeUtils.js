// @ts-check

/** @type {'theme'} */
const THEME_KEY = 'theme';

/** @type {'dark'} */
const DARK_THEME = 'dark';

/** @type {'light'} */
const LIGHT_THEME = 'light';

/**
 * @typedef {'dark' | 'light'} Theme
 */

/**
 * Get saved theme from localStorage
 * @returns {Theme} The saved theme ('dark' or 'light')
 */
export function getSavedTheme() {
  const theme = localStorage.getItem(THEME_KEY);
  return /** @type {Theme} */ (theme || LIGHT_THEME);
}

/**
 * Save theme to localStorage
 * @param {Theme} theme - Theme to save ('dark' or 'light')
 * @returns {void}
 */
export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Apply theme to document
 * @param {Theme} theme - Theme to apply ('dark' or 'light')
 * @returns {void}
 */
export function applyTheme(theme) {
  if (theme === DARK_THEME) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * Toggle between dark and light themes
 * @returns {Theme} The new active theme
 */
export function toggleTheme() {
  const currentTheme = getSavedTheme();
  const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  saveTheme(newTheme);
  applyTheme(newTheme);
  return newTheme;
}

/**
 * Initialize theme on page load
 * @returns {Theme} The initialized theme
 */
export function initializeTheme() {
  const savedTheme = getSavedTheme();
  applyTheme(savedTheme);
  return savedTheme;
}

export { DARK_THEME, LIGHT_THEME };
