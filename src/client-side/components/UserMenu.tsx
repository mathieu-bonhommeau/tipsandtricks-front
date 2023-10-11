import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { routes } from '../router/router.tsx';

type UserMenuProps = {
    username: string;
};

function UserMenu({ username }: UserMenuProps) {
    const links = [
        {
            label: 'Tips Board',
            path: routes.homepage,
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

    return (
        <Box sx={{ flexGrow: 0 }}>
            <MenuItem onClick={handleOpenUserMenu}>
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
                    <MenuItem key={link.label} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                            <Link to={'/test'}>{link.label}</Link>
                        </Typography>
                    </MenuItem>
                ))}
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Déconnexion</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default UserMenu;
