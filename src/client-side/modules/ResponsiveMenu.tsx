import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Menu} from "@mui/material";
import {MenuItemComponent} from "./components/MenuItem.tsx";
import {routes} from "../router/router.tsx";

export type ResponsiveMenuProps = {
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
    anchorEl: HTMLElement | null,
    onClose: () => void
}
export function ResponsiveMenu({onClick, anchorEl, onClose}: ResponsiveMenuProps) {
    return <Box sx={{
        display: {xs: "flex", md: "none"},
        marginRight: "2rem"
    }}>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={onClick}
            color="inherit"
        >
            <MenuIcon/>
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onClose}
            sx={{
                display: {xs: "block", md: "none"},
                flexDirection: "column",
            }}
        >
            <MenuItemComponent label="Home" path={routes.homepage} customCss={{display: "block"}}
                               closeMenu={onClose}/>
            <MenuItemComponent label="Explore Tips" path={routes.feed} customCss={{display: "block"}}
                               closeMenu={onClose}/>
        </Menu>
    </Box>;
}