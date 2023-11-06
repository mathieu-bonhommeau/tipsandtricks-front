import {routes} from "../router/router.tsx";
import {Typography} from "@mui/material";
import {constants} from "../../_config/constants/constants.ts";
import {WriteAnimation} from "./animations/WriteAnimation.tsx";
import {Link} from "react-router-dom";

export const Logo = () => {
    return (
        <Link to={routes.homepage} style={{
            textDecoration: 'none',
            color: 'inherit'
        }}>
            <Typography
                variant="h6"
                noWrap
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
        </Link>
    )
}