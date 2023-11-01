import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import UserMenu from './UserMenu.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { routes } from '../router/router.tsx';

function AppHeader() {
    const user = useSelector((state: RootState) => state.authentication.user);
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href={routes.feed}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TIPS & TRICKS
                    </Typography>
                    {user ? (
                        <UserMenu username={user.username} />
                    ) : (
                        <Typography href={routes.login} component="a" sx={{ color: 'inherit', textDecoration: 'none' }}>
                            Se connecter
                        </Typography>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppHeader;
