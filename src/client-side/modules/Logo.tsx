import {routes} from "../router/router.tsx";
import {Typography} from "@mui/material";
import {constants} from "../../_config/constants/constants.ts";
import {WriteAnimation} from "./animations/WriteAnimation.tsx";

export const Logo = () => {
    return (
        <Typography
            variant="h6"
            noWrap
            component="a"
            href={routes.feed}
            fontWeight='fontWeightMedium'
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
            <WriteAnimation textToWrite={constants.logoText} />
        </Typography>
    )
}