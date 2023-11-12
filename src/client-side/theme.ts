import { createTheme, PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => {
    if (mode === 'light') {
        return {
            background: {
                paper: '#F3F4FD',
                default: '#F4FAFF',
            },
            text: {
                primary: '#030313',
                secondary: '#4970CC',
            },
            primary: {
                main: '#030313',
                light: '#9BDAE3',
                dark: '#3853A9',
                contrastText: '#030313',
            },
            secondary: {
                main: 'linear-gradient(-220deg, #F4FAFF, #E0F7FC, #E0F7FC)',
                light: '#7F7F7F',
                lightLess: '#4A4B4D',
                dark: '#E51A1A',
                contrastText: '#030313',
            },
        }
    } else if (mode === 'dark') {
        return {
            background: {
                paper: '#24282C',
                default: '#111316'
            },
            text: {
                primary: '#FFFFFF',
                secondary: '#5E5D62',
            },
            primary: {
                main: '#ffffff',
                light: '#5E5D62',
                dark: '#7F0404',
                contrastText: '#FFFFFF',
            },
            secondary: {
                main: 'linear-gradient(-220deg, #111316, #1C1F22, #1C1F22)',
                light: '#7F7F7F',
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


export const tagColors: { [key: string]: string } = {
    'tag 1': '#F6D912',
    'tag 2': '#E74645',
    'tag 3': '#6592FD',
}