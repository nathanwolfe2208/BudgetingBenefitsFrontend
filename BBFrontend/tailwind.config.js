module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // This tells Tailwind to look for class names in HTML and TypeScript files within the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
