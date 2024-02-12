import { Theme } from '@mui/material';

export const buttonStyle = (theme: Theme) => ({
    minWidth: '150px',
    background: theme.palette.primary.dark,
    boxShadow: `5px 5px 20px #000`,
    borderRadius: '5px',
    '&:hover': {
        background: theme.palette.secondary.dark,
        boxShadow: `10px 10px 20px #000`,
    },
});

export const littleButtonStyle = (theme: Theme, unable: boolean = true) => {
    return {
        minWidth: { xs: 'auto', md: '75px' },
        display: 'flex',
        justifyContent: 'center',
        alignSelf: { xs: 'flex-end' },
        px: { xs: 1, md: 1 },
        py: { xs: 0.5, md: 1 },
        background: unable ? theme.palette.primary.dark : theme.palette.primary.light,
        boxShadow: `3px 3px 10px #000`,
        borderRadius: '5px',
        fontSize: '12px',
        '&:hover': {
            background: theme.palette.secondary.dark,
            boxShadow: `5px 5px 10px #000`,
        },
    };
};

export const iconArrowStyle = (theme: Theme) => ({
    color: theme.palette.primary.light,
    fontSize: '2rem',
    transition: 'transform 0.2s ease-in-out',
    transform: 'scale(1)',
});

export const iconArrowBackStyle = (theme: Theme) => ({
    ...iconArrowStyle(theme),
    transform: 'scale(1) rotate(180deg)',
    '&:hover': {
        transform: 'rotate(180deg) scale(1.1)',
        color: theme.palette.text.primary,
    },
});

export const iconStyle = (theme: Theme) => ({
    color: theme.palette.primary.light,
    '&:hover': {
        transform: 'scale(1.1)',
        color: 'primary.main',
    },
});
