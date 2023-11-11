import {
    Alert,
    Container,
} from '@mui/material';
import {FormEvent, useEffect, useState} from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import {
    registerUser,
} from '../../domain/user/use-cases/registration.actions.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { useNavigate } from 'react-router-dom';
import { RegistrationUserInput } from '../../domain/user/models/registration.model.ts';
import {constants} from "../../_config/constants/constants.ts";
import {PasswordTextField} from "./components/PasswordTextField.tsx";
import {EmailTextField} from "./components/EmailTextField.tsx";
import {UsernameTextField} from "./components/UsernameTextField.tsx";
import {ConfirmPasswordTextField} from "./components/ConfirmPasswordTextField.tsx";
import {ButtonAuthForm} from "./components/ButtonAuthForm.tsx";

function Register() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [serverErrorMessage, setServerErrorMessage] = useState('');

    const isUnknownServerError = useSelector((state: RootState) => state.registration.unknownServerError);

    useEffect(() => {
        if (isUnknownServerError) setServerErrorMessage(constants.unknownError);
    }, [isUnknownServerError])

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
            padding: {xs: '15px', md: '40px'},
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
                <EmailTextField email={email} setEmail={setEmail} setServerErrorMessage={setServerErrorMessage} />
                <UsernameTextField username={userName} setUserName={setUserName} setServerErrorMessage={setServerErrorMessage}/>
                <PasswordTextField password={password} setPassword={setPassword}/>
                <ConfirmPasswordTextField password={password} confirmationPassword={confirmationPassword} setConfirmationPassword={setConfirmationPassword} />
                {serverErrorMessage && <Alert variant="filled" severity="error" sx={{width: '100%', boxShadow: `15px 15px 30px #000`,}}>{serverErrorMessage}</Alert>}
                <ButtonAuthForm formType={"login"} />
            </form>
        </Container>
    );
}

export default Register;
