import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../router/router.tsx';
import { logoutUser } from '../../domain/user/use-cases/authentication.actions.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { useAppDispatch } from '../utils/dispatch.ts';
import { userMenuItemLineStyle, userMenuItemStyle } from '../style/menuStyle.ts';

type UserMenuProps = {
    username: string;
};

function UserMenu({ username }: UserMenuProps) {
    const theme = useTheme();
    const links = [
        {
            label: 'Tips Board',
            path: routes.tipsBoard,
        },
        {
            label: 'Profil',
            path: routes.homepage,
        },
    ];

    const [navAnchor, setNavAnchor] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setNavAnchor(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setNavAnchor(null);
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogoutUser = async () => {
        await dispatch(
            logoutUser({
                params: {
                    gatewayInterface: dependencyContainer.get<UserGatewayInterface>('UserGateway'),
                    navigate: navigate,
                },
            }),
        );
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <MenuItem
                onClick={handleOpenUserMenu}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    '&:hover': {
                        background: 'inherit',
                    },
                }}
            >
                <Typography textAlign="center">{username}</Typography>
                <IconButton sx={{ p: 0, marginLeft: '6px' }}>
                    <AccountCircleIcon sx={{ color: 'white' }} />
                </IconButton>
            </MenuItem>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={navAnchor}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(navAnchor)}
                onClose={handleCloseUserMenu}
            >
                {links.map((link) => (
                    <Box sx={userMenuItemStyle()}>
                        <Link
                            key={link.label}
                            to={link.path}
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.text.primary,
                            }}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{link.label}</Typography>
                            </MenuItem>
                        </Link>
                        <Box sx={userMenuItemLineStyle()} />
                    </Box>
                ))}
                <Box sx={userMenuItemStyle()}>
                    <MenuItem onClick={handleLogoutUser}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                    <Box sx={userMenuItemLineStyle()} />
                </Box>
            </Menu>
        </Box>
    );
}

export default UserMenu;
