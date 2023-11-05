import {AppBar, Container, Toolbar, Typography, useTheme} from '@mui/material';
import UserMenu from './UserMenu.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { routes } from '../router/router.tsx';
import Box from "@mui/material/Box";
import LoginIcon from '@mui/icons-material/Login';
import {Logo} from "./Logo.tsx";

function AppHeader() {
    const user = useSelector((state: RootState) => state.authentication.user);
    const theme = useTheme();

    return (
        <AppBar position="static" elevation={0} sx={{
            background: 'transparent',
            mx: 'auto',
            width: '100%'
        }}>
            <Container maxWidth="xl" sx={{
                border: '1px solid',
                borderColor: theme.palette.primary.light,
                my: 2 ,
                mx: 'auto',
                borderRadius: '10px'
            }}>
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Logo />
                    {user ? (
                        <UserMenu username={user.username} />
                    ) : (
                        <Typography href={routes.login} component="a" sx={{
                            color: 'inherit',
                            textDecoration: 'none',
                            position: 'relative',
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                            '&:hover .login-line': {
                                transform: 'scaleX(1.5)',
                            }
                        }}>
                            LOGIN
                            <LoginIcon />
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
                        </Typography>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppHeader;
