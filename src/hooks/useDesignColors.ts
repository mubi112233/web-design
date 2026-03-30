import { useDesignSystem } from '@/components/DesignSystemProvider';

export const useDesignColors = () => {
  const { tokens } = useDesignSystem();
  
  return {
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    accent: tokens.colors.accent,
    background: tokens.colors.background,
    foreground: tokens.colors.foreground,
    muted: tokens.colors.muted,
    border: tokens.colors.border,
    card: tokens.colors.card,
    gold: tokens.colors.gold,
    goldLight: tokens.colors.goldLight,
    goldDark: tokens.colors.goldDark,
  };
};

// CSS class generator for dynamic colors
export const useColorClasses = () => {
  const { theme } = useDesignSystem();
  
  const baseClasses = {
    'text-primary': 'text-primary',
    'text-secondary': 'text-secondary', 
    'text-accent': 'text-accent',
    'text-gold': 'text-gold',
    'text-gold-light': 'text-gold-light',
    'text-gold-dark': 'text-gold-dark',
    'bg-primary': 'bg-primary',
    'bg-secondary': 'bg-secondary',
    'bg-accent': 'bg-accent',
    'bg-gold': 'bg-gold',
    'bg-gold-light': 'bg-gold-light',
    'bg-gold-dark': 'bg-gold-dark',
    'border-primary': 'border-primary',
    'border-gold': 'border-gold',
    'border-gold-light': 'border-gold-light',
    'border-gold-dark': 'border-gold-dark',
    'hover-gold': 'hover:bg-gold/10 hover:text-gold',
    'hover-primary': 'hover:bg-primary/10 hover:text-primary',
  };
  
  return baseClasses;
};
