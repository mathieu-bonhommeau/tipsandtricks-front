import {AppBar, Container, Toolbar, useTheme} from '@mui/material';
import UserMenu from './UserMenu.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../domain/store.ts';
import {routes} from '../router/router.tsx';
import Box from "@mui/material/Box";
import LoginIcon from '@mui/icons-material/Login';
import {Logo} from "./Logo.tsx";
import {Link} from "react-router-dom";
import {MenuItemComponent} from "./components/MenuItem.tsx";
import {LinkAnimation} from "./animations/LinkAnimation.tsx";
import * as React from "react";
import {ResponsiveMenu} from "./ResponsiveMenu.tsx";

function AppHeader() {
    const user = useSelector((state: RootState) => state.authentication.user);
    const theme = useTheme();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" elevation={0} sx={{
            background: 'transparent',
            mx: 'auto',
            width: '100%'
        }}>
            <Container maxWidth="xl" sx={{
                border: '1px solid',
                borderColor: theme.palette.primary.light,
                my: 2,
                mx: 'auto',
                borderRadius: '10px',
            }}>
                <Toolbar disableGutters sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Box sx={{width: "250px", display: {xs: 'none', md: 'block'}}}>
                        <Logo customCss={{
                            display: {
                                xs: 'none',
                                md: 'block'
                            }
                        }}/>
                    </Box>
                    <ResponsiveMenu onClick={handleOpenNavMenu} anchorEl={anchorElNav} onClose={handleCloseNavMenu}/>
                    <Box sx={{ display: {xs: 'none', sm: 'block', md: 'none'}}}><Logo customCss={{
                        display: {
                            xs: 'block',
                            md: 'none'
                        }
                    }}/></Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'}, marginRight: '30px'}}>
                        <MenuItemComponent label="Home" path={routes.homepage}/>
                        <MenuItemComponent label="Explore Tips" path={routes.feed}/>
                    </Box>
                    <Box sx={{width: {xs: 'auto', md: '250px'}}}>
                        {user ? (
                            <LinkAnimation>
                                <UserMenu username={user.username}/>
                            </LinkAnimation>
                        ) : (
                            <Link to={routes.login} style={{
                                textDecoration: 'none',
                                color: 'inherit'
                            }}>
                                <LinkAnimation>
                                    LOGIN
                                    <LoginIcon/>
                                </LinkAnimation>
                            </Link>
                        )}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppHeader;
