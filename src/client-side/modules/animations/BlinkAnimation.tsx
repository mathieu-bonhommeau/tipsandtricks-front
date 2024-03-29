import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Box, useTheme } from '@mui/material';

export type BlinkAnimationProps = {
    delay?: number;
    speed?: number;
    reload?: boolean;
};
export const BlinkAnimation = ({ delay = 0, speed = 1000, reload = true }: BlinkAnimationProps) => {
    const theme = useTheme();
    const [content, setContent] = useState<ReactElement>();

    const cursor = useMemo(
        () => (
            <Box
                sx={{
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
                }}
            />
        ),
        [theme, speed],
    );

    useEffect(() => {
        if (!reload) {
            return setContent(cursor);
        }
        setTimeout(() => {
            setContent(cursor);
        }, delay!);
    }, [delay, reload, cursor]);

    return content;
};
