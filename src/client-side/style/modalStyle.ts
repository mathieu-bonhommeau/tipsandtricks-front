import {Theme} from "@mui/material";

export const boxStyle = (theme: Theme) => ({
    width: '50vw',
    minWidth: '400px',
    background: theme.palette.primary.light,
    boxShadow: 24,
    py: 2,
    px:4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 2,
    mx: 'auto',
    my: '20vh',
    borderRadius: 2,
});