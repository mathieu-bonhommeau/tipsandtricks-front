import React from "react";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material";

export type LinkAnimationProps = {
    children: React.ReactNode
}

export function LinkAnimation({children}: LinkAnimationProps) {
    const theme = useTheme()
    return (
        <Box sx={{
            width: '250px',
            display: 'flex',
            justifyContent: 'flex-end',
            color: theme.palette.text.primary,
            position: 'relative',
            gap: 1,
            alignItems: 'center',
            '&:hover .login-line': {
                transform: 'scaleX(0.4)',
            }
        }}>
            {children}
            <Box className="login-line" sx={{
                width: '100%',
                borderBottom: '1px solid',
                textAlign: 'right',
                transformOrigin: 'right',
                transform: 'scaleX(0)',
                transition: 'transform 0.2s ease-in-out',
                position: 'absolute',
                bottom: -5,
            }}/>
        </Box>
    )
}