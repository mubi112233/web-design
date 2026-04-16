"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { colorSchemes, getCSSVariables, DesignTokens } from '@/lib/design-system';

type ThemeScheme = 'gold' | 'blue' | 'green' | 'purple' | 'red';

interface DesignSystemContextType {
  theme: ThemeScheme;
  setTheme: (theme: ThemeScheme) => void;
  tokens: DesignTokens;
  cssVariables: Record<string, string>;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
};

export const DesignSystemProvider: React.FC<{ children: React.ReactNode; defaultTheme?: ThemeScheme }> = ({ 
  children, 
  defaultTheme = 'blue' 
}) => {
  const siteTheme = process.env.NEXT_PUBLIC_SITE_THEME as ThemeScheme | undefined;
  const initialTheme = siteTheme && colorSchemes[siteTheme] ? siteTheme : defaultTheme;
  const [theme, setThemeState] = useState<ThemeScheme>(initialTheme);
  
  // Load theme from localStorage on mount (but prioritize defaultTheme for now)
  useEffect(() => {
    const savedTheme = localStorage.getItem('design-theme') as ThemeScheme;
    // Temporarily force default theme to ensure color scheme change takes effect
    if (savedTheme && colorSchemes[savedTheme] && savedTheme !== defaultTheme) {
      // Clear old theme and set to new default
      localStorage.removeItem('design-theme');
      setThemeState(defaultTheme);
    } else if (savedTheme && colorSchemes[savedTheme]) {
      setThemeState(savedTheme);
    }
  }, [defaultTheme]);

  const setTheme = (newTheme: ThemeScheme) => {
    setThemeState(newTheme);
    localStorage.setItem('design-theme', newTheme);
    
    // Update CSS custom properties
    const root = document.documentElement;
    const cssVars = getCSSVariables(newTheme);
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  const tokens = colorSchemes[theme];
  const cssVariables = getCSSVariables(theme);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [cssVariables]);

  return (
    <DesignSystemContext.Provider value={{ theme, setTheme, tokens, cssVariables }}>
      {children}
    </DesignSystemContext.Provider>
  );
};

// Theme Switcher Component
export const ThemeSwitcher = () => {
  const { theme, setTheme } = useDesignSystem();

  const themes: { value: ThemeScheme; label: string; color: string }[] = [
    { value: 'gold', label: 'Blue', color: 'bg-blue-500' },
    { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { value: 'green', label: 'Green', color: 'bg-green-500' },
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { value: 'red', label: 'Red', color: 'bg-red-500' },
  ];

  return (
    <div className="flex items-center gap-2">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`w-6 h-6 rounded-full ${t.color} ${
            theme === t.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
          } transition-all duration-200`}
          title={`Switch to ${t.label} theme`}
        />
      ))}
    </div>
  );
};
