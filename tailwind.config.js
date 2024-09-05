module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      signature: ['Great Vibes', 'cursive'],
    },
    colors: {
      gray: '#818181',
      'light-gray': '#D9D9D9',
      black: '#181818',
      primary: '#d22d77', // hot pink
      white: '#FFFFFF',
      transparent: 'transparent',

      // Dark mode colors
      'dark-gray': '#444444',
      'dark-light-gray': '#A9A9A9',
      'dark-black': '#E5E5E5', // lighter black for dark mode
      'dark-primary': '#ff4da6', // a brighter variant of hot pink for dark mode
      'dark-border': '#3a3a3a',
    },
    extend: {
      backgroundImage: () => ({
        // 'hero-pattern': 'url("/assets-hero.svg")',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
