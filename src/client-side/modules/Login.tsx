import {Alert, Container} from '@mui/material';
import {FormEvent, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { LoginUserInput } from '../../domain/user/models/authentication.model.ts';
import { useAppDispatch } from '../utils/dispatch.ts';
import { loginUser } from '../../domain/user/use-cases/authentication.actions.ts';
import { resetErrorState } from '../../domain/user/use-cases/authentication.slice.ts';
import { useNavigate } from 'react-router-dom';
import {EmailTextField} from "./components/EmailTextField.tsx";
import {PasswordTextField} from "./components/PasswordTextField.tsx";
import {ButtonAuthForm} from "./components/ButtonAuthForm.tsx";
import {constants} from "../../_config/constants/constants.ts";
import {SnackBarComponent} from "./components/SnackBarComponent.tsx";

function Login() {
    const isCredentialsError = useSelector((state: RootState) => state.authentication.credentialsError);
    const isUnknownError = useSelector((state: RootState) => state.authentication.unknownServerLoginError);
    const userNewlyRegistered = useSelector((state: RootState) => state.registration.user);
    const emailInitValue = userNewlyRegistered ? userNewlyRegistered.email : '';
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

    const [email, setEmail] = useState<string>(emailInitValue);
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        userNewlyRegistered && setOpenSnackbar(true)
    }, [userNewlyRegistered])

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(resetErrorState());

        const userInput: LoginUserInput = {
            email: email,
            password: password,
        };

        await dispatch(
            loginUser({
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
                <EmailTextField email={email} setEmail={setEmail} />
                <PasswordTextField password={password} setPassword={setPassword} />
                {userNewlyRegistered && <SnackBarComponent
                    type="success"
                    setOpenSnackbar={setOpenSnackbar}
                    openSnackbar={openSnackbar}
                    message={constants.accountCreateSuccess}
                />}
                {isCredentialsError && <Alert
                    variant="filled"
                    severity="error"
                    sx={{
                        width: '100%',
                        boxShadow: `15px 15px 30px #000`
                }}>
                    {constants.badCredentials}
                </Alert>}
                {isUnknownError && <Alert
                    variant="filled"
                    severity="error"
                    sx={{
                        width: '100%',
                        boxShadow: `15px 15px 30px #000`
                }}>
                    {constants.unknownError}
                </Alert>}
                <ButtonAuthForm formType={'register'} />
            </form>
        </Container>
    );
}

export default Login;
