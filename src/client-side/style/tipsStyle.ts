import { Theme } from '@mui/material';

export const commandStyle = (theme: Theme) => ({
    width: '100%',
    p: 2,
    background: theme.palette.secondary.main,
    boxShadow: '15px 15px 30px #000',
    borderRadius: '10px',
});
