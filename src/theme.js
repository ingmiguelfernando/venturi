import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
    info: {
      main: "#115395",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
    typography: { button: { textTransform: "capitalize" } },
    spacing: 25,
  },
});
export default theme;
