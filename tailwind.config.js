module.exports = {
  purge: ["./resources/views/**/*.edge", "./resources/views/*.edge"],
  theme: {
    extend: {
      boxShadow: {
        outline: "0 0 0 1px rgba(66, 153, 225, 0.5)",
      },
      colors: {
        "orange-button": "#FF872E",
        "green-button": "#1ABC9C",
        "purple-hover": "#4C52F8",
        "green-hover": "#BBDFC8",
        "purple-hover-stroke": "#8286FF",
        "purple-progress": "#3B41E3",
        "green-progress": "#7ECA9C",
      },
      borderRadius: {
        20: "20px",
      },
      backgroundColor: ["active"],
      textDecoration: ["active"],
    },
  },
  fontFamily: {
    sans: ["Poppins", "sans-serif"],
  },
  variants: {},
  plugins: [],
};
