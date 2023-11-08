import {TextField, useTheme} from "@mui/material";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {textFieldStyle} from "../../style/textFieldStyle.ts";

export type EmailTextFieldProps = {
    label: string,
    title: string,
    isRequired?: boolean,
    setTitle: Dispatch<SetStateAction<string>>
}
export function ClassicTextField ({label, title, setTitle, isRequired}: EmailTextFieldProps) {
    const theme = useTheme()

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <TextField
            label={label}
            variant="outlined"
            type="text"
            required={isRequired}
            value={title}
            onChange={onChangeTitle}
            sx={textFieldStyle(theme)}
        />
    )
}