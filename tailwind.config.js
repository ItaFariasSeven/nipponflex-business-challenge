/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        aclonica: ['Aclonica', 'sans-serif'],
        acme: ['Acme', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        body: ['Acme', 'sans-serif'],
      },
      colors: {
        brand: {
          amber: '#d97706',
          dark: '#1c1917',
        },
      },
      backgroundImage: {
        hero: "url('https://placehold.co/1440x1054/orange/white?text=Hero+Background')",
      },
    },
  },
  plugins: [],
}
