import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            A700: grey[700],
        },
        secondary: {
            main: '#FFFFFF'
        },
        info: {
            main: "#115395",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#000000",
            paper: "#FFFFFF",
        }
    },
    typography: { button: { textTransform: "capitalize" } },
    spacing: 25
});

export default theme;