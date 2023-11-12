import { Container, Paper, Typography, useTheme } from '@mui/material';

function AppFooter() {
    const theme = useTheme();
    return (
        <Paper
            sx={{
                background: 'transparent',
                width: '100%',
                mx: 'auto',
                bottom: 15,
                boxShadow: 'none',
                position: 'relative',
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    border: '1px solid',
                    borderColor: theme.palette.primary.light,
                    borderRadius: '10px',
                    p: 3,
                }}
            >
                <Typography>FOOTER</Typography>
            </Container>
        </Paper>
    );
}

export default AppFooter;
