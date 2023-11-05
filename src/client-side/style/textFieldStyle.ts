import {Theme} from "@mui/material";

export const textFieldStyle = (theme: Theme, error: boolean = false) => ({
    width: '100%',
    borderRadius: '10px',
    color: theme.palette.primary.light,
    '& .MuiFormLabel-root': {
        color: theme.palette.primary.light,
    },
    '& .MuiOutlinedInput-root': {
        '& input': {
            zIndex: 1,
        },
        '& fieldset': {
            background: theme.palette.secondary.main,
            borderRadius: '10px',
            boxShadow: '15px 15px 30px #000',
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
        },
    },
    '& .MuiFormHelperText-root': {
        zIndex: 1,
        marginLeft: 0,
    }
});

export const iconInTextFieldStyle = (theme: Theme) => ({
    zIndex: 1,
    color: theme.palette.primary.light,
    width: '20px',
    height: '20px',
    '& .MuiIconButton-root': {
        padding: '0px',
        color: 'inherit'
    }
})

export const dividerInTextFieldStyle = (theme: Theme) => ({
    height: '35px',
    zIndex: 1,
    margin: '0 12px',
    backgroundColor: theme.palette.primary.light,
    width: '1px',
})

export const buttonIconTextFieldStyle = (theme: Theme) => ({
    '&:hover': {
        color: theme.palette.text.primary,
    },
})