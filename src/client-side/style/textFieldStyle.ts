import {Theme} from "@mui/material";

export const textFieldStyle = (theme: Theme, error: boolean = false) => ({
    width: '100%',
    borderRadius: '10px',
    color: theme.palette.secondary.light,
    '& .MuiFormLabel-root': {
        color: theme.palette.secondary.light,
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

export const textOutlineFieldStyle = (theme: Theme, error: boolean = false) => ({
    width: '100%',
    borderRadius: '10px',
    color: theme.palette.secondary.light,
    '& .MuiFormLabel-root': {
        color: theme.palette.secondary.light,
    },
    '& .MuiOutlinedInput-root': {
        '& input': {
            zIndex: 1,
        },
        '& fieldset': {
            borderRadius: '10px',
            borderColor: theme.palette.background.default,
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
export const titleFieldStyle = (theme: Theme, error: boolean = false) => ({
    width: '100%',
    borderRadius: '10px',
    color: theme.palette.secondary.light,
    '& .MuiFormLabel-root': {
        color: theme.palette.secondary.light,
    },
    '& .MuiOutlinedInput-root': {
        fontSize: '28px',
        '& input': {
            zIndex: 1,
        },
        '& fieldset': {
            background: 'transparent',
            borderRadius: '10px',
            borderColor: theme.palette.background.default,
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

export const textTipsFieldStyle = (theme: Theme) => ({
    width: '100%',
    color: theme.palette.text.primary,
    background: '#000',
    p: '10px',
    minHeight: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiIconButton-root': {
        background: 'none',
    },
    '& .MuiSvgIcon-root': {
        width: '20px',
        height: '20px',
        color: theme.palette.secondary.light,
        transform: 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            color: theme.palette.text.primary,
            transform: 'scale(1.2)',
        }
    },
});

export const copyCommandResultStyle = (theme: Theme, error: boolean = false) => ({
    fontSize: '12px',
    color: error ? theme.palette.primary.dark : theme.palette.text.primary,
})

export const iconInTextFieldStyle = (theme: Theme) => ({
    zIndex: 1,
    color: theme.palette.secondary.light,
    width: '20px',
    height: '20px',
    '& .MuiIconButton-root': {
        padding: '0px',
        color: 'inherit'
    },
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