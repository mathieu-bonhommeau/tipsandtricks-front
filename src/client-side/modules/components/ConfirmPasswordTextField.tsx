import { IconButton, InputAdornment, TextField, useTheme } from '@mui/material';
import { constants } from '../../../_config/constants/constants.ts';
import { buttonIconTextFieldStyle, iconInTextFieldStyle, textFieldStyle } from '../../style/textFieldStyle.ts';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../domain/store.ts';
import { checkConfirmationPassword } from '../../../domain/user/use-cases/registration.actions.ts';
import { useAppDispatch } from '../../utils/dispatch.ts';

export type ConfirmPasswordTextFieldProps = {
    password: string;
    confirmationPassword: string;
    setConfirmationPassword: Dispatch<SetStateAction<string>>;
};

export function ConfirmPasswordTextField({
    password,
    confirmationPassword,
    setConfirmationPassword,
}: ConfirmPasswordTextFieldProps) {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

    const arePasswordsEqual = useSelector((state: RootState) => state.registration.passwordsEquality);

    const onChangeConfirmationPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmationPassword(event.target.value);
        dispatch(checkConfirmationPassword(password, event.target.value));
    };

    return (
        <>
            <TextField
                label="Password confirmation"
                variant="outlined"
                type={viewConfirmPassword ? 'text' : 'password'}
                error={!arePasswordsEqual}
                required
                value={confirmationPassword}
                onChange={onChangeConfirmationPassword}
                helperText={arePasswordsEqual ? '' : constants.passwordNotSame}
                sx={textFieldStyle(theme, !arePasswordsEqual)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start" sx={iconInTextFieldStyle(theme)}>
                            <IconButton
                                sx={buttonIconTextFieldStyle(theme)}
                                onMouseOver={() => setViewConfirmPassword(true)}
                                onMouseOut={() => setViewConfirmPassword(false)}
                            >
                                <RemoveRedEyeIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    );
}
