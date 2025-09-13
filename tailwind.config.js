import fs from "fs";

/** @type {import('tailwindcss').Config} */

let theme = {};
try {
  const themePath = "./theme.json";

  if (fs.existsSync(themePath)) {
    theme = JSON.parse(fs.readFileSync(themePath, "utf-8"));
  }
} catch (err) {
  // console.error('failed to parse custom styles', err)
}
const defaultTheme = {
  container: {
    center: true,
    padding: "2rem",
  },
  extend: {
    screens: {
      coarse: { raw: "(pointer: coarse)" },
      fine: { raw: "(pointer: fine)" },
      pwa: { raw: "(display-mode: standalone)" },
    },
    animation: {
      'fadeIn': 'fadeIn 0.3s ease-out forwards',
      'fadeOut': 'fadeOut 0.3s ease-out forwards',
      'modalSlideIn': 'modalSlideIn 0.3s ease-out forwards',
      'modalSlideOut': 'modalSlideOut 0.3s ease-out forwards',
      'float-slow': 'float-slow 8s ease-in-out infinite',
      'float-medium': 'float-medium 6s ease-in-out infinite',
      'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
      'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
    },
    animationDelay: {
      '100': '100ms',
      '200': '200ms',
      '300': '300ms',
      '400': '400ms',
      '500': '500ms',
      '600': '600ms',
      '700': '700ms',
      '800': '800ms',
      '900': '900ms',
      '1000': '1000ms',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      modalSlideIn: {
        '0%': { 
          opacity: '0', 
          transform: 'scale(0.95) translateY(8px)' 
        },
        '100%': { 
          opacity: '1', 
          transform: 'scale(1) translateY(0)' 
        },
      },
      modalSlideOut: {
        '0%': { 
          opacity: '1', 
          transform: 'scale(1) translateY(0)' 
        },
        '100%': { 
          opacity: '0', 
          transform: 'scale(0.95) translateY(8px)' 
        },
      },
      'float-slow': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      'float-medium': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-15px)' },
      },
      'bounce-slow': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      'pulse-slow': {
        '0%, 100%': { opacity: '0.8' },
        '50%': { opacity: '0.4' },
      },
    },
    colors: {
      neutral: {
        1: "var(--color-neutral-1)",
        2: "var(--color-neutral-2)",
        3: "var(--color-neutral-3)",
        4: "var(--color-neutral-4)",
        5: "var(--color-neutral-5)",
        6: "var(--color-neutral-6)",
        7: "var(--color-neutral-7)",
        8: "var(--color-neutral-8)",
        9: "var(--color-neutral-9)",
        10: "var(--color-neutral-10)",
        11: "var(--color-neutral-11)",
        12: "var(--color-neutral-12)",
        a1: "var(--color-neutral-a1)",
        a2: "var(--color-neutral-a2)",
        a3: "var(--color-neutral-a3)",
        a4: "var(--color-neutral-a4)",
        a5: "var(--color-neutral-a5)",
        a6: "var(--color-neutral-a6)",
        a7: "var(--color-neutral-a7)",
        a8: "var(--color-neutral-a8)",
        a9: "var(--color-neutral-a9)",
        a10: "var(--color-neutral-a10)",
        a11: "var(--color-neutral-a11)",
        a12: "var(--color-neutral-a12)",
        contrast: "var(--color-neutral-contrast)",
      },
      accent: {
        1: "var(--color-accent-1)",
        2: "var(--color-accent-2)",
        3: "var(--color-accent-3)",
        4: "var(--color-accent-4)",
        5: "var(--color-accent-5)",
        6: "var(--color-accent-6)",
        7: "var(--color-accent-7)",
        8: "var(--color-accent-8)",
        9: "var(--color-accent-9)",
        10: "var(--color-accent-10)",
        11: "var(--color-accent-11)",
        12: "var(--color-accent-12)",
        contrast: "var(--color-accent-contrast)",
        foreground: "var(--color-accent-foreground)",
      },
      "accent-secondary": {
        1: "var(--color-accent-secondary-1)",
        2: "var(--color-accent-secondary-2)",
        3: "var(--color-accent-secondary-3)",
        4: "var(--color-accent-secondary-4)",
        5: "var(--color-accent-secondary-5)",
        6: "var(--color-accent-secondary-6)",
        7: "var(--color-accent-secondary-7)",
        8: "var(--color-accent-secondary-8)",
        9: "var(--color-accent-secondary-9)",
        10: "var(--color-accent-secondary-10)",
        11: "var(--color-accent-secondary-11)",
        12: "var(--color-accent-secondary-12)",
        contrast: "var(--color-accent-secondary-contrast)",
      },
      fg: {
        DEFAULT: "var(--color-fg)",
        secondary: "var(--color-fg-secondary)",
      },
      bg: {
        DEFAULT: "var(--color-bg)",
        inset: "var(--color-bg-inset)",
        overlay: "var(--color-bg-overlay)",
      },
      "focus-ring": "var(--color-focus-ring)",
    },
    borderRadius: {
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      xl: "var(--radius-xl)",
      "2xl": "var(--radius-2xl)",
      full: "var(--radius-full)",
    },
  },
  spacing: {
    px: "var(--size-px)",
    0: "var(--size-0)",
    0.5: "var(--size-0-5)",
    1: "var(--size-1)",
    1.5: "var(--size-1-5)",
    2: "var(--size-2)",
    2.5: "var(--size-2-5)",
    3: "var(--size-3)",
    3.5: "var(--size-3-5)",
    4: "var(--size-4)",
    5: "var(--size-5)",
    6: "var(--size-6)",
    7: "var(--size-7)",
    8: "var(--size-8)",
    9: "var(--size-9)",
    10: "var(--size-10)",
    11: "var(--size-11)",
    12: "var(--size-12)",
    14: "var(--size-14)",
    16: "var(--size-16)",
    20: "var(--size-20)",
    24: "var(--size-24)",
    28: "var(--size-28)",
    32: "var(--size-32)",
    36: "var(--size-36)",
    40: "var(--size-40)",
    44: "var(--size-44)",
    48: "var(--size-48)",
    52: "var(--size-52)",
    56: "var(--size-56)",
    60: "var(--size-60)",
    64: "var(--size-64)",
    72: "var(--size-72)",
    80: "var(--size-80)",
    96: "var(--size-96)",
  },
  darkMode: ["selector", '[data-appearance="dark"]'],
}

export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/admin/**/*.{js,ts,jsx,tsx}" // Support pour admin panel
  ],
  theme: { ...defaultTheme, ...theme },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#B8956A",
          "secondary": "#5D3A25", 
          "accent": "#F9F6F0",
          "neutral": "#1a0f08",
          "base-100": "#F9F6F0",
          "base-200": "#F2E8D7",
          "base-300": "#E5D5B7",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272"
        },
        dark: {
          "primary": "#B8956A",
          "secondary": "#5D3A25",
          "accent": "#1a0f08", 
          "neutral": "#e6eef8",
          "base-100": "#1a0f08",
          "base-200": "#2a1f18",
          "base-300": "#3a2f28",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272"
        }
      }
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
};