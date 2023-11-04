import {createTheme, PaletteMode} from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => {
    if (mode === 'light') {
        return {
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
            }
        }
    } else if (mode === 'dark') {
        return {
            background: {
                paper: '#0F1019',
                default: '#0F1019',
            },
            text: {
                primary: '#FFFFFF',
                secondary: '#211046',
            },
            primary: {
                main: '#161722',
                light: '#363946',
                dark: '#3853A9',
                contrastText: '#FFFFFF',
            }
        }
    }
}

export const theme = (mode: PaletteMode) => createTheme({
    palette: getDesignTokens(mode),
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
