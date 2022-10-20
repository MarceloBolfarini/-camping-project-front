import { createTheme } from "@mui/material/styles";

const Colors = {
    primary: "#fff",
    white: "#fff",
    secondary: "#fff",
}

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },
        secondary: {
            main: Colors.secondary
        },
        white: {
            main: Colors.white
        }
    }
});

export default theme;

