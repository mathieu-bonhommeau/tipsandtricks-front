import { createTheme, PaletteMode } from '@mui/material';

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
                paper: '#24282C',
                default: 'linear-gradient(-220deg, #111316, #30363C)'
            },
            text: {
                primary: '#FFFFFF',
                secondary: '#211046',
            },
            primary: {
                main: '#ffffff',
                light: '#5E5D62',
                lightLess: '#4A4B4D',
                dark: '#7F0404',
                contrastText: '#FFFFFF',
            },
            secondary: {
                main: 'linear-gradient(-220deg, #111316, #1C1F22, #1C1F22)',
                light: '#5E5D62',
                lightLess: '#4A4B4D',
                dark: '#E51A1A',
                contrastText: '#FFFFFF',
            },
            error: {
                main: '#E82F21',
            },
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
            fontFamily: 'Roboto mono, sans-serif',
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.2,
        },
    },
});
