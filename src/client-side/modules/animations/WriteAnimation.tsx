import { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';

export type WriteAnimationProps = {
    textToWrite: string;
    delay?: number;
    speed?: number;
    reload?: boolean;
};
export const WriteAnimation = ({ textToWrite, delay = 0, speed = 150, reload = true }: WriteAnimationProps) => {
    const textToWriteSplit = textToWrite.split('');
    const [text, setText] = useState<string>('');
    const [indexLetter, setIndexLetter] = useState<number>(0);
    const speedRef = useRef(0);
    speedRef.current = speed;

    useEffect(() => {
        if (indexLetter == 0 && delay != 0) speedRef.current += delay;
        if (indexLetter === textToWriteSplit.length) {
            return;
        }
        if (!reload) {
            return setText(textToWrite);
        }
        setTimeout(() => {
            setIndexLetter(indexLetter + 1);
            setText(text + textToWriteSplit[indexLetter]);
        }, speedRef.current);
    }, [indexLetter, text, delay, reload, textToWriteSplit, speed, textToWrite]);

    return (
        <Typography fontWeight="fontWeightMedium" sx={{ fontSize: 'inherit' }}>
            {text}
            {indexLetter > 2 && '_'}
        </Typography>
    );
};
