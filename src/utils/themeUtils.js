const THEME_KEY = 'theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

/**
 * Get saved theme from localStorage
 * @returns {string} - 'dark' or 'light'
 */
export function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || LIGHT_THEME;
}

/**
 * Save theme to localStorage
 * @param {string} theme - 'dark' or 'light'
 */
export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Apply theme to document
 * @param {string} theme - 'dark' or 'light'
 */
export function applyTheme(theme) {
  if (theme === DARK_THEME) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * Toggle theme
 * @returns {string} - New theme
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
 */
export function initializeTheme() {
  const savedTheme = getSavedTheme();
  applyTheme(savedTheme);
  return savedTheme;
}

export { DARK_THEME, LIGHT_THEME };
