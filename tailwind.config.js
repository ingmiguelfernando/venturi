module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        airplane: "url('/airplane-background.png')",
        "venturi-logo": "url('/venturi_logo.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
