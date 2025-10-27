import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@bookly_theme';

const forestTheme = {
  primary: "#4CAF50",
  textPrimary: "#2e5a2e",
  textSecondary: "#688f68",
  textDark: "#1b361b",
  placeholderText: "#767676",
  background: "#e8f5e9",
  cardBackground: "#f1f8f2",
  inputBackground: "#f4faf5",
  border: "#c8e6c9",
  white: "#ffffff",
  black: "#000000",
};

const retroTheme = {
  primary: "#e17055",
  textPrimary: "#784e2d",
  textSecondary: "#a58e7c",
  textDark: "#50372a",
  placeholderText: "#767676",
  background: "#ede1d1",
  cardBackground: "#faf5eb",
  inputBackground: "#f7f2ea",
  border: "#e2d6c1",
  white: "#ffffff",
  black: "#000000",
};

const oceanTheme = {
  primary: "#1976D2",
  textPrimary: "#1a4971",
  textSecondary: "#6d93b8",
  textDark: "#0d2b43",
  placeholderText: "#767676",
  background: "#e3f2fd",
  cardBackground: "#f5f9ff",
  inputBackground: "#f0f8ff",
  border: "#bbdefb",
  white: "#ffffff",
  black: "#000000",
};

const blossomTheme = {
  primary: "#EC407A",
  textPrimary: "#7d2150",
  textSecondary: "#b06a8f",
  textDark: "#5a1836",
  placeholderText: "#767676",
  background: "#fce4ec",
  cardBackground: "#fff5f8",
  inputBackground: "#fef8fa",
  border: "#f8bbd0",
  white: "#ffffff",
  black: "#000000",
};

export const THEMES = {
  forest: forestTheme,
  retro: retroTheme,
  ocean: oceanTheme,
  blossom: blossomTheme,
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('forest');
  const [theme, setTheme] = useState(THEMES.forest);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && THEMES[savedTheme]) {
        setCurrentTheme(savedTheme);
        setTheme(THEMES[savedTheme]);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const changeTheme = async (themeName) => {
    try {
      if (THEMES[themeName]) {
        setCurrentTheme(themeName);
        setTheme(THEMES[themeName]);
        await AsyncStorage.setItem(THEME_STORAGE_KEY, themeName);
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, changeTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
