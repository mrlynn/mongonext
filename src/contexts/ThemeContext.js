/**
 * @file Theme context provider for application-wide dark/light mode
 * @module contexts/ThemeContext
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Local storage key for theme preference
 * @constant {string}
 */
const THEME_MODE_KEY = 'mongonext-theme-mode';

/**
 * Theme context containing current mode and functions to modify it
 * @typedef {Object} ThemeContextType
 * @property {string} mode - Current theme mode ('light' or 'dark')
 * @property {Function} toggleTheme - Function to toggle between light and dark mode
 * @property {Function} setMode - Function to directly set mode to a specific value
 */

/**
 * Context for managing application theme
 * @type {React.Context<ThemeContextType>}
 */
export const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
  setMode: () => {},
});

/**
 * Custom hook to access the theme context
 * @returns {ThemeContextType} The theme context value
 * @example
 * const { mode, toggleTheme } = useThemeContext();
 */
export const useThemeContext = () => useContext(ThemeContext);

/**
 * Provider component for theme context
 * Manages theme state and syncs with localStorage and system preferences
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement|null} The provider component
 * 
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem(THEME_MODE_KEY);
    
    if (storedTheme) {
      setMode(storedTheme);
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDarkMode ? 'dark' : 'light');
    }

    // Add listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    /**
     * Handler for system theme preference changes
     * @function
     * @param {MediaQueryListEvent} e - Media query change event
     */
    const handleChange = (e) => {
      if (!localStorage.getItem(THEME_MODE_KEY)) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /**
   * Toggle between light and dark theme
   * @function
   */
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem(THEME_MODE_KEY, newMode);
  };

  /**
   * Set theme to a specific mode
   * @function
   * @param {string} newMode - The new theme mode ('light' or 'dark')
   */
  const updateMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem(THEME_MODE_KEY, newMode);
  };

  // Prevent flash of wrong theme while loading
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setMode: updateMode }}>
      {children}
    </ThemeContext.Provider>
  );
};