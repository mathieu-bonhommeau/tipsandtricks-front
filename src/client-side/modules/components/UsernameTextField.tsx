import {TextField, useTheme} from "@mui/material";
import {constants} from "../../../_config/constants/constants.ts";
import {textFieldStyle} from "../../style/textFieldStyle.ts";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../domain/store.ts";
import {
    checkUsernameValidity
} from "../../../domain/user/use-cases/registration.actions.ts";
import {useAppDispatch} from "../../utils/dispatch.ts";
import {
    resetUsernameAlreadyUsedError
} from "../../../domain/user/use-cases/registration.slice.ts";

export type UsernameTextFieldProps = {
    username: string,
    setUserName: Dispatch<SetStateAction<string>>
    setServerErrorMessage: Dispatch<SetStateAction<string>>
}

export function UsernameTextField({username, setUserName, setServerErrorMessage}: UsernameTextFieldProps) {
    const theme = useTheme()
    const dispatch = useAppDispatch();

    const isUsernameValid = useSelector((state: RootState) => state.registration.usernameValidity);
    const isUsernameAlreadyUsedError = useSelector((state: RootState) => state.registration.usernameAlreadyUsedError);

    if (isUsernameAlreadyUsedError) setServerErrorMessage(constants.usernameAlreadyUsed);

    const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
        dispatch(checkUsernameValidity(event.target.value));
        if (isUsernameAlreadyUsedError) dispatch(resetUsernameAlreadyUsedError());
    };

    return (
        <TextField
            label="Username"
            variant="outlined"
            value={username}
            error={!isUsernameValid}
            required
            onChange={onChangeUsername}
            helperText={isUsernameValid ? '' : constants.usernameMinChar}
            sx={textFieldStyle(theme, !isUsernameValid)}
        />
    )
}