import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { ReactElement } from 'react';

function BaseTemplate({ children }: { children: ReactElement }) {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ m: 6 }} />
            <Container maxWidth={'xl'}>{children}</Container>
        </>
    );
}

export default BaseTemplate;
