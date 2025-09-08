// Design tokens inspirés du système de design de la page d'accueil
export const adminDesignTokens = {
  // Layout patterns from homepage - Normalisé
  layout: {
    section: 'relative min-h-[calc(100vh-4rem)] px-4 py-8 md:py-12',
    container: 'relative z-10 max-w-6xl mx-auto',
    grid: 'grid gap-4 md:gap-6'
  },

  // Card styles from ProjectCard
  cards: {
    base: 'group h-full flex flex-col overflow-hidden bg-card border-2 border-border',
    hover: 'hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20',
    transition: 'transition-all duration-500',
    glass: 'bg-background/40 backdrop-blur-md rounded-2xl',
    glassHover: 'hover:bg-background/60',
    padding: 'p-5',
    iconContainer: 'w-10 h-10',
    icon: 'w-5 h-5',
    headerGap: 'gap-3',
    headerMargin: 'mb-4'
  },

  // Typography from homepage sections - Normalisée
  typography: {
    hero: 'text-2xl md:text-3xl font-bold animate-fadeInUp',
    section: 'text-xl md:text-2xl font-bold mb-6',
    card: 'text-lg font-semibold mb-3',
    muted: 'text-muted-foreground',
    accent: 'group-hover:text-accent transition-colors duration-300'
  },

  // Effects from HeroSection and ProjectCard
  effects: {
    gradient: 'bg-gradient-radial from-accent/10 via-transparent to-transparent',
    glow: 'after:absolute after:inset-0 after:bg-gradient-radial after:blur-3xl',
    fadeIn: 'animate-fadeInUp opacity-0 [animation-fill-mode:forwards]',
    scale: 'group-hover:scale-105 transition-transform duration-500'
  },

  // Button styles from ContactSection - Normalisés
  buttons: {
    primary: 'bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 text-base font-medium',
    outline: 'border-accent text-accent hover:bg-accent/10 px-6 py-2 text-base font-medium',
    hover: 'group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25',
    icon: 'group-hover:translate-x-1 transition-transform duration-200'
  },

  // Spacing consistent with homepage - Normalisé
  spacing: {
    page: 'px-4 py-6',
    section: 'mb-6',
    card: 'p-4',
    grid: 'gap-4',
    content: 'space-y-4'
  }
}
