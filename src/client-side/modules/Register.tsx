import {
    Alert, Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Popover,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import {
    checkConfirmationPassword, checkEmailValidity,
    checkPasswordValidity,
    checkUsernameValidity,
    registerUser,
} from '../../domain/user/use-cases/registration.actions.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { Link, useNavigate } from 'react-router-dom';
import { RegistrationUserInput } from '../../domain/user/models/registration.model.ts';
import {
    resetEmailAlreadyUsedError,
    resetUsernameAlreadyUsedError,
} from '../../domain/user/use-cases/registration.slice.ts';
import { routes } from '../router/router.tsx';
import {
    buttonIconTextFieldStyle,
    dividerInTextFieldStyle,
    iconInTextFieldStyle,
    textFieldStyle
} from "../style/textFieldStyle.ts";
import InfoIcon from '@mui/icons-material/Info';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {constants} from "../../_config/constants/constants.ts";
import {buttonStyle} from "../style/buttonStyle.ts";
import {FormType} from "../pages/Home.tsx";

export type RegisterProps = {
    setDisplayForm: Dispatch<SetStateAction<FormType>>
}

function Register({setDisplayForm}: RegisterProps) {
    const theme = useTheme()
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false);
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
    const [anchorElPopover, setAnchorElPopover] = useState(null);
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const isPasswordValid = useSelector((state: RootState) => state.registration.passwordValidity);
    const isEmailValid = useSelector((state: RootState) => state.registration.emailValidity);
    const arePasswordsEqual = useSelector((state: RootState) => state.registration.passwordsEquality);
    const isUsernameValid = useSelector((state: RootState) => state.registration.usernameValidity);

    const isUsernameAlreadyUsedError = useSelector((state: RootState) => state.registration.usernameAlreadyUsedError);
    const isEmailAlreadyUsedError = useSelector((state: RootState) => state.registration.emailAlreadyUsedError);
    const isUnknownServerError = useSelector((state: RootState) => state.registration.unknownServerError);

    let serverErrorMessage = null;
    if (isUsernameAlreadyUsedError)
        serverErrorMessage = constants.usernameAlreadyUsed;
    if (isEmailAlreadyUsedError) serverErrorMessage = constants.emailAlreadyUsed;
    if (isUnknownServerError) serverErrorMessage = constants.unknownError;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        dispatch(checkEmailValidity(event.target.value))
        if (isEmailAlreadyUsedError) dispatch(resetEmailAlreadyUsedError());
    };

    const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
        dispatch(checkUsernameValidity(event.target.value));
        if (isUsernameAlreadyUsedError) dispatch(resetUsernameAlreadyUsedError());
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        dispatch(checkPasswordValidity(event.target.value));
    };

    const onChangeConfirmationPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmationPassword(event.target.value);
        dispatch(checkConfirmationPassword(password, event.target.value));
    };

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userInput: RegistrationUserInput = {
            username: userName,
            email: email,
            password: password,
            confirmationPassword: confirmationPassword,
        };

        await dispatch(
            registerUser({
                params: {
                    gatewayInterface: dependencyContainer.get<UserGatewayInterface>('UserGateway'),
                    navigate: navigate,
                },
                userInput: userInput,
            }),
        );
    };

    return (
        <Container maxWidth={'md'} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            p: '40px !important'
        }}>
            <form
                onSubmit={onSubmitHandler}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '30px',
                    width: '100%'
                }}
            >
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
                <TextField
                    label="Username"
                    variant="outlined"
                    required
                    value={userName}
                    error={!isUsernameValid}
                    onChange={onChangeUsername}
                    helperText={isUsernameValid ? '' : constants.usernameMinChar}
                    sx={textFieldStyle(theme, !isUsernameValid)}
                />
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
                                         onMouseOver={(e) => setAnchorElPopover(e.currentTarget)}
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
                <TextField
                    label="Password confirmation"
                    variant="outlined"
                    type={viewConfirmPassword ? "text" : "password"}
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
                {serverErrorMessage && <Alert severity="error">{serverErrorMessage}</Alert>}
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={buttonStyle(theme)}
                    >
                        Join !
                    </Button>
                    <Typography component="p">
                        You already have an account ?{' '}
                    </Typography>
                    <Typography onClick={() => setDisplayForm('login')}>Login</Typography>
                </Box>
            </form>
        </Container>
    );
}

export default Register;
