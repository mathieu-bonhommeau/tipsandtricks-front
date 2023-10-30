import { createTheme } from '@mui/material';

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
        background: {
            paper: '#F3F4FD',
            default: '#202CA8',
        },
        text: {
            primary: '#000000',
            secondary: '#4970CC',
        },
        primary: {
            main: '#4970CC',
            light: '#ECECF3',
            dark: '#3853A9',
            contrastText: '#FFFFFF',
        },
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
