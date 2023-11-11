import {Theme} from "@mui/material";

export const postCardStyle = () => ({
    maxWidth: 1000,
    borderRadius: '10px',
    px: {xs: 1, md: 2},
    py: 1
})

export const postCardHeaderStyle = (theme: Theme) => ({
    borderBottom: '1px solid',
    borderColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiCardHeader-content .MuiCardHeader-subheader': {
        ...postDateStyle(theme)
    }
})

export const postCardTitleStyle = (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover .icon-post-title': {
        transform: 'scale(1.1)',
        color: theme.palette.text.primary,
    }
})

export const postCardMessageStyle = () => ({
    my: '10px',
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
})

export const postDetailsBoxStyle = (theme: Theme) => ({
    width: '100%',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
    p: 2
})

export const postDetailsAvatarStyle = (theme: Theme) => ({
    display: 'flex',
    gap: {xs: '0px', md: '10px'},
    alignItems: 'center',
    borderBottom: '1px solid',
    paddingBottom: '15px',
    borderColor: theme.palette.primary.light,
})

export const postDateStyle = (theme: Theme) => ({
    color: theme.palette.secondary.light, fontSize: '0.8rem'
})