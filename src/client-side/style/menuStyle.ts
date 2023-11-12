export const userMenuItemStyle = () => ({
    padding: '5px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '&:hover .MuiBox-root': {
        transform: 'scaleX(1)',
    },
});

export const userMenuItemLineStyle = () => ({
    borderBottom: '1px solid',
    width: '100%',
    transform: 'scaleX(0)',
    transition: 'transform 0.2s ease-in-out',
});
