import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'grayscale';
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark' | 'grayscale') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [theme, setTheme] = useState<'light' | 'dark' | 'grayscale'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'grayscale') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      let newTheme: 'light' | 'dark' | 'grayscale' = 'light';
      if (prevTheme === 'light') newTheme = 'dark';
      else if (prevTheme === 'dark') newTheme = 'grayscale';
      else newTheme = 'light';
      
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const setThemeMode = (mode: 'light' | 'dark' | 'grayscale') => {
    setTheme(mode);
    localStorage.setItem('theme', mode);
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