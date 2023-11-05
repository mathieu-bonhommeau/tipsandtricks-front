import {useEffect, useState} from "react";
import {Typography} from "@mui/material";

export type WriteAnimationProps = {
    textToWrite: string,
    delay?: number,
    speed?: number
}
export const WriteAnimation = ({textToWrite, delay = 0, speed = 150}: WriteAnimationProps) => {
    const textToWriteSplit = textToWrite.split('')
    const [text, setText] = useState<string>('')
    const [indexLetter, setIndexLetter] = useState<number>(0)

    useEffect(() => {
        if (indexLetter == 0 && delay != 0) speed += delay
        if (indexLetter === textToWriteSplit.length) {
            return
        }
        setTimeout(() => {
            setIndexLetter(indexLetter + 1)
            setText(
                text + textToWriteSplit[indexLetter]
            )
        }, speed!)
    }, [indexLetter, text])

    return (
            <Typography fontWeight='fontWeightMedium' sx={{fontSize: 'inherit'}}>
                {text}
                {indexLetter > 2 && '_'}
            </Typography>
    )
}