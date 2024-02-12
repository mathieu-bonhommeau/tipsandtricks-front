import { TextField, useTheme } from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { titleFieldStyle } from '../../style/textFieldStyle.ts';

export type TitleTextFieldProps = {
    label: string;
    title: string;
    isRequired?: boolean;
    setTitle: Dispatch<SetStateAction<string>>;
};
export function TitleTextField({ label, title, setTitle, isRequired }: TitleTextFieldProps) {
    const theme = useTheme();

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
            sx={titleFieldStyle(theme)}
        />
    );
}
