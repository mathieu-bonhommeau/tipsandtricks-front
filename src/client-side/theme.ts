import { createTheme } from '@mui/material';

/*const light = {
    main: "#FFFFFF",
    light: "#202CA8",
    dark: "#4970CC",
    //secondary: "#ECECF3",
    contrastText: "#4970CC",
};*/

const dark = {
    main: '#211046',
    light: '#190B37',
    dark: '#3853A9',
    //secondary: "#2D2458",
    contrastText: '#92DBFE',
};

export const theme = createTheme({
    palette: {
        primary: dark,
    },
});
