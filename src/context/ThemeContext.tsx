import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'grayscale';
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark' | 'grayscale') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [theme, setTheme] = useState<'light' | 'dark' | 'grayscale'>(() => {
    try {
      let savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        savedTheme = savedTheme.replace(/['"]+/g, '');
      }
      if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'grayscale') {
        return savedTheme as 'light' | 'dark' | 'grayscale';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      console.warn('Error reading theme from localStorage', error);
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Error setting theme to localStorage', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'grayscale';
      return 'light';
    });
  };

  const setThemeMode = (mode: 'light' | 'dark' | 'grayscale') => {
    setTheme(mode);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'grayscale-theme');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'grayscale') {
      root.classList.add('grayscale-theme');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};