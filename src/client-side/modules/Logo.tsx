import {routes} from "../router/router.tsx";
import {Typography} from "@mui/material";
import {constants} from "../../_config/constants/constants.ts";
import {WriteAnimation} from "./animations/WriteAnimation.tsx";
import {Link} from "react-router-dom";

export type LogoProps = {
    customCss?: { [key: string]: { [key: string]: string } },
}

export const Logo = ({customCss}: LogoProps) => {
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
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: {xs: '1rem', md: '1.2rem'},
                    letterSpacing: {xs: '.1rem', md: '.2rem'},
                    color: 'inherit',
                    textDecoration: 'none',
                    ...customCss
                }}
            >
                <WriteAnimation textToWrite={constants.logoText} />
            </Typography>
        </Link>
    )
}