import {ReactElement, useEffect, useState} from "react";
import {Box, useTheme} from "@mui/material";

export type BlinkAnimationProps = {
    delay?: number,
    speed?: number
}
export const BlinkAnimation = ({delay = 0, speed = 1000}: BlinkAnimationProps) => {
    const theme = useTheme()
    const [content, setContent] = useState<ReactElement>()

    useEffect(() => {
        setTimeout(() => {
            setContent(
                <Box sx={{
                    width: '20px',
                    height: '4px',
                    background: theme.palette.text.primary,
                    animation: `blink ${speed}ms infinite none`,
                    '@keyframes blink': {
                        '0%, 100%': {
                            opacity: 1,
                        },
                        '50%': {
                            opacity: 0,
                        },
                    },
                }} />
            )
        }, delay!)
    }, [])

    return content
}
