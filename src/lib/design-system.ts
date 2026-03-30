// Global Design System for Multi-Site Consistency
export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    card: string;
    gold: string;
    goldLight: string;
    goldDark: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    gold: string;
  };
  typography: {
    fontFamily: {
      sans: string[];
      display: string[];
    };
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
      '7xl': string;
    };
  };
}

// Default Design Tokens
export const defaultDesignTokens: DesignTokens = {
  colors: {
    primary: 'hsl(45, 80%, 55%)', // Gold
    secondary: 'hsl(45, 70%, 45%)', // Lighter Gold
    accent: 'hsl(45, 90%, 65%)', // Brighter Gold
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    muted: 'hsl(var(--muted-foreground))',
    border: 'hsl(var(--border))',
    card: 'hsl(var(--card))',
    gold: 'hsl(45, 80%, 55%)',
    goldLight: 'hsl(45, 80%, 65%)',
    goldDark: 'hsl(45, 80%, 45%)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    gold: '0 20px 60px -15px hsl(45 80% 55% / 0.7)',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
  },
};

// Alternative Color Schemes for Different Sites
export const colorSchemes = {
  // Gold Theme (Current)
  gold: {
    ...defaultDesignTokens,
    colors: {
      ...defaultDesignTokens.colors,
      primary: 'hsl(45, 80%, 55%)',
      secondary: 'hsl(45, 70%, 45%)',
      accent: 'hsl(45, 90%, 65%)',
      gold: 'hsl(45, 80%, 55%)',
      goldLight: 'hsl(45, 80%, 65%)',
      goldDark: 'hsl(45, 80%, 45%)',
    },
  },
  
  // Blue Theme
  blue: {
    ...defaultDesignTokens,
    colors: {
      ...defaultDesignTokens.colors,
      primary: 'hsl(217, 91%, 60%)',
      secondary: 'hsl(217, 91%, 50%)',
      accent: 'hsl(217, 91%, 70%)',
      gold: 'hsl(217, 91%, 60%)', // Renamed but still primary
      goldLight: 'hsl(217, 91%, 70%)',
      goldDark: 'hsl(217, 91%, 50%)',
    },
  },
  
  // Green Theme
  green: {
    ...defaultDesignTokens,
    colors: {
      ...defaultDesignTokens.colors,
      primary: 'hsl(142, 71%, 45%)',
      secondary: 'hsl(142, 71%, 35%)',
      accent: 'hsl(142, 71%, 55%)',
      gold: 'hsl(142, 71%, 45%)', // Renamed but still primary
      goldLight: 'hsl(142, 71%, 55%)',
      goldDark: 'hsl(142, 71%, 35%)',
    },
  },
  
  // Purple Theme
  purple: {
    ...defaultDesignTokens,
    colors: {
      ...defaultDesignTokens.colors,
      primary: 'hsl(262, 83%, 58%)',
      secondary: 'hsl(262, 83%, 48%)',
      accent: 'hsl(262, 83%, 68%)',
      gold: 'hsl(262, 83%, 58%)', // Renamed but still primary
      goldLight: 'hsl(262, 83%, 68%)',
      goldDark: 'hsl(262, 83%, 48%)',
    },
  },
  
  // Red Theme
  red: {
    ...defaultDesignTokens,
    colors: {
      ...defaultDesignTokens.colors,
      primary: 'hsl(0, 84%, 60%)',
      secondary: 'hsl(0, 84%, 50%)',
      accent: 'hsl(0, 84%, 70%)',
      gold: 'hsl(0, 84%, 60%)', // Renamed but still primary
      goldLight: 'hsl(0, 84%, 70%)',
      goldDark: 'hsl(0, 84%, 50%)',
    },
  },
};

// Helper function to get CSS custom properties
export const getCSSVariables = (scheme: keyof typeof colorSchemes = 'gold') => {
  const tokens = colorSchemes[scheme];
  
  return {
    '--color-primary': tokens.colors.primary,
    '--color-secondary': tokens.colors.secondary,
    '--color-accent': tokens.colors.accent,
    '--color-gold': tokens.colors.gold,
    '--color-gold-light': tokens.colors.goldLight,
    '--color-gold-dark': tokens.colors.goldDark,
    '--spacing-xs': tokens.spacing.xs,
    '--spacing-sm': tokens.spacing.sm,
    '--spacing-md': tokens.spacing.md,
    '--spacing-lg': tokens.spacing.lg,
    '--spacing-xl': tokens.spacing.xl,
    '--spacing-xxl': tokens.spacing.xxl,
    '--radius-sm': tokens.borderRadius.sm,
    '--radius-md': tokens.borderRadius.md,
    '--radius-lg': tokens.borderRadius.lg,
    '--radius-xl': tokens.borderRadius.xl,
    '--shadow-gold': tokens.shadows.gold,
    '--font-sans': tokens.typography.fontFamily.sans.join(', '),
    '--font-display': tokens.typography.fontFamily.display.join(', '),
  };
};

// Utility classes generator
export const generateUtilityClasses = (scheme: keyof typeof colorSchemes = 'gold') => {
  const tokens = colorSchemes[scheme];
  
  return {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    gold: 'bg-gold text-background',
    goldLight: 'bg-gold-light text-background',
    goldDark: 'bg-gold-dark text-background',
    border: 'border-border',
    card: 'bg-card text-card-foreground',
    muted: 'bg-muted text-muted-foreground',
  };
};
