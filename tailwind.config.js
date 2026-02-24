import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '2560px',
    },
    extend: {
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'],
      },
      colors: {
        common: {
          black: '#000',
          white: '#fff',
        },
        default: '#D3DEDC',
        primary: '#ACB1D6',
        secondary: '#DBDFEA',
        warning: '#C8B6E2',
        error: '#E49393',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
