import {Box, IconButton, InputAdornment, Popover, TextField, Typography, useTheme} from "@mui/material";
import {constants} from "../../../_config/constants/constants.ts";
import {
    buttonIconTextFieldStyle,
    dividerInTextFieldStyle,
    iconInTextFieldStyle,
    textFieldStyle
} from "../../style/textFieldStyle.ts";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoIcon from "@mui/icons-material/Info";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../domain/store.ts";
import {checkPasswordValidity} from "../../../domain/user/use-cases/registration.actions.ts";
import {useAppDispatch} from "../../utils/dispatch.ts";

export type PasswordTextFieldProps = {
    password: string,
    setPassword: Dispatch<SetStateAction<string>>
}

export function PasswordTextField({password, setPassword}: PasswordTextFieldProps) {
    const theme = useTheme()
    const dispatch = useAppDispatch();
    const [viewPassword, setViewPassword] = useState(false);
    const [anchorElPopover, setAnchorElPopover] = useState(null);

    const isPasswordValid = useSelector((state: RootState) => state.registration.passwordValidity);

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        dispatch(checkPasswordValidity(event.target.value));
    };

    return (
        <>
            <TextField
                label="Password"
                variant="outlined"
                type={viewPassword ? "text" : "password"}
                error={!isPasswordValid}
                required
                value={password}
                onChange={onChangePassword}
                helperText={isPasswordValid ? '' : constants.passwordBadFormat}
                sx={textFieldStyle(theme, !isPasswordValid)}
                InputProps={{
                    endAdornment: (
                        <>
                            <InputAdornment position="start" sx={iconInTextFieldStyle(theme)}>
                                <IconButton
                                    sx={buttonIconTextFieldStyle(theme)}
                                    onMouseOver={() => setViewPassword(true)}
                                    onMouseOut={() => setViewPassword(false)}
                                >
                                    <RemoveRedEyeIcon />
                                </IconButton>
                            </InputAdornment>
                            <Box sx={dividerInTextFieldStyle(theme)}/>
                            <InputAdornment position="start" sx={iconInTextFieldStyle(theme)}>
                                <IconButton sx={buttonIconTextFieldStyle(theme)}
                                            onClick={(e) => setAnchorElPopover(e.currentTarget)}
                                >
                                    <InfoIcon />
                                </IconButton>
                            </InputAdornment>
                        </>
                    ),
                }}
            />
            <Popover
                open={!!anchorElPopover}
                anchorEl={anchorElPopover}
                onClose={() => setAnchorElPopover(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                sx={{
                    width: '100%',
                    marginTop: '20px'
                }}
            >
                <Typography sx={{ p: 2, background: theme.palette.primary.light}}>
                    {constants.infosRegisterPassword}
                </Typography>
            </Popover>
        </>
    )
}