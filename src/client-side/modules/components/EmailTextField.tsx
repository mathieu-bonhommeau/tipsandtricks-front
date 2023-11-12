import { TextField, useTheme } from '@mui/material';
import { constants } from '../../../_config/constants/constants.ts';
import { textFieldStyle } from '../../style/textFieldStyle.ts';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/store.ts';
import { checkEmailValidity } from '../../../domain/user/use-cases/registration.actions.ts';
import { useAppDispatch } from '../../utils/dispatch.ts';
import { resetEmailAlreadyUsedError } from '../../../domain/user/use-cases/registration.slice.ts';

export type EmailTextFieldProps = {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    setServerErrorMessage?: Dispatch<SetStateAction<string>>;
};

export function EmailTextField({ email, setEmail, setServerErrorMessage }: EmailTextFieldProps) {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const isEmailValid = useSelector((state: RootState) => state.registration.emailValidity);
    const isEmailAlreadyUsedError = useSelector((state: RootState) => state.registration.emailAlreadyUsedError);

    if (isEmailAlreadyUsedError && setServerErrorMessage) setServerErrorMessage(constants.emailAlreadyUsed);

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        dispatch(checkEmailValidity(event.target.value));
        if (isEmailAlreadyUsedError) dispatch(resetEmailAlreadyUsedError());
    };

    return (
        <TextField
            label="Email address"
            variant="outlined"
            type="email"
            error={!isEmailValid}
            required
            value={email}
            onChange={onChangeEmail}
            helperText={isEmailValid ? '' : constants.emailBadFormat}
            sx={textFieldStyle(theme, !isEmailValid)}
        />
    );
}
