import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
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
