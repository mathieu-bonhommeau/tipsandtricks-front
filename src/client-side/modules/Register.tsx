import {
    Alert, Box,
    Button,
    Container,
    Typography,
    useTheme
} from '@mui/material';
import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react';
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
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {constants} from "../../_config/constants/constants.ts";
import {buttonStyle} from "../style/buttonStyle.ts";
import {FormType} from "../pages/Home.tsx";
import {PasswordTextField} from "./components/PasswordTextField.tsx";
import {EmailTextField} from "./components/EmailTextField.tsx";
import {UsernameTextField} from "./components/UsernameTextField.tsx";
import {ConfirmPasswordTextField} from "./components/ConfirmPasswordTextField.tsx";
import {ButtonAuthForm} from "./components/ButtonAuthForm.tsx";

export type RegisterProps = {
    setDisplayForm: Dispatch<SetStateAction<FormType>>
}

function Register({setDisplayForm}: RegisterProps) {
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
                <EmailTextField email={email} setEmail={setEmail} setServerErrorMessage={setServerErrorMessage} />
                <UsernameTextField username={userName} setUserName={setUserName} setServerErrorMessage={setServerErrorMessage}/>
                <PasswordTextField password={password} setPassword={setPassword}/>
                <ConfirmPasswordTextField password={password} confirmationPassword={confirmationPassword} setConfirmationPassword={setConfirmationPassword} />
                {serverErrorMessage && <Alert variant="filled" severity="error" sx={{width: '100%', boxShadow: `15px 15px 30px #000`,}}>{serverErrorMessage}</Alert>}
                <ButtonAuthForm setDisplayForm={setDisplayForm} formType={"login"} />
            </form>
        </Container>
    );
}

export default Register;
