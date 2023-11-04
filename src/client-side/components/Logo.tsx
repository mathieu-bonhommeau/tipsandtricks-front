import {useEffect, useState} from "react";
import {routes} from "../router/router.tsx";
import {Typography} from "@mui/material";

export const Logo = () => {
    const NameApp = '>_ TIPS & TRICKS'
    const NameAppSplit = NameApp.split('')
    const [logo, setLogo] = useState<string>('')
    const [indexLetter, setIndexLetter] = useState<number>(0)

    useEffect(() => {
        if (indexLetter === NameAppSplit.length) {
            return
        }
        setTimeout(() => {
            setIndexLetter(indexLetter + 1)
            setLogo(
                logo + NameAppSplit[indexLetter]
            )
        }, 150)
    }, [indexLetter, logo])

    return (
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
            <Typography fontWeight='fontWeightMedium'>
                {logo}
                {indexLetter > 2 && '_'}
            </Typography>
        </Typography>
    )
}