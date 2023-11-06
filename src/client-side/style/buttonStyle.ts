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

export const littleButtonStyle = (theme: Theme, unable: boolean = true) => {
    return {
        minWidth: '75px',
        background: unable ? theme.palette.primary.dark : theme.palette.primary.light,
        boxShadow: `3px 3px 10px #000`,
        borderRadius: '5px',
        fontSize: '12px',
        '&:hover': {
            background: theme.palette.secondary.dark,
            boxShadow: `5px 5px 10px #000`,
        }
    }
}