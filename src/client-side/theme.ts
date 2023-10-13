import { createTheme } from '@mui/material';
import { indigo, orange } from '@mui/material/colors';

/*const light = {
    main: "#FFFFFF",
    light: "#202CA8",
    dark: "#4970CC",
    //secondary: "#ECECF3",
    contrastText: "#4970CC",
};*/

/*const dark = {
    main: '#211046',
    light: '#190B37',
    dark: '#3853A9',
    //secondary: "#2D2458",
    contrastText: '#92DBFE',
};*/

export const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: orange,
    },
    typography: {
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontWeightBold: 700,
        fontWeightMedium: 600,
        fontWeightRegular: 400,
        body1: {
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.5,
        },
        h1: {
            color: '#211046',
            fontFamily: 'Roboto mono, sans-serif',
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.2,
        },
    },
});
