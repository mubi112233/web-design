/**
 * Global spacing constants matching React project with additional side spacing
 */

export const SPACING = {
  // Horizontal padding for containers (150px side spacing)
  container: "px-[150px]",
  
  // Additional 150px space around all components
  wrapper: "px-[150px]",
  
  // Combined: 150px + React spacing
  containerWithSpace: "px-[150px] px-4 sm:px-6 md:px-8 lg:px-4",
  
  // Side margins for sections (creates space around components)
  sectionMargin: "mx-4 sm:mx-6 md:mx-8 lg:mx-4",
  
  // 150px side margins only
  sideMargin: "mx-[150px]",
  
  // Vertical padding for sections
  section: "py-8 sm:py-10 md:py-12 lg:py-14",
  
  // Max widths
  maxWidth: {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  },
} as const;
