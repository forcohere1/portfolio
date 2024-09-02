module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      signature: ['Great Vibes', 'cursive'],
    },
    colors: {
      gray: '#818181',
      'light-gray': '#D9D9D9',
      black: '#181818',
      primary: '#d22d77', // pink
  
      white: '#FFFFFF',
      transparent: 'transparent',
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
