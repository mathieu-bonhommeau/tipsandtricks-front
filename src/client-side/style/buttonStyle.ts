import {Theme} from "@mui/material";

export const buttonStyle = (theme: Theme) => ({
    minWidth: '150px',
    background: theme.palette.primary.dark,
    boxShadow: `5px 5px 20px #000`,
    borderRadius: '5px',
    '&:hover': {
        background: theme.palette.secondary.dark,
        boxShadow: `10px 10px 20px #000`,
    }
})