import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import {
    checkConfirmationPassword,
    checkPasswordValidity,
    checkUsernameValidity,
    registerUser,
} from '../../domain/user/use-cases/registration.actions.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { UserGatewayApi } from '../../server-side/user/user-gateway.api.ts';
import { UserInput } from '../../domain/user/models/registration.model.ts';

function Register() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const isPasswordValid = useSelector((state: RootState) => state.registration.passwordValidity);
    const arePasswordsEqual = useSelector((state: RootState) => state.registration.passwordsEquality);
    const isUsernameValid = useSelector((state: RootState) => state.registration.usernameValidity);

    const dispatch = useAppDispatch();

    const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
        dispatch(checkUsernameValidity(event.target.value));
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        dispatch(checkPasswordValidity(event.target.value));
    };

    const onChangeConfirmationPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmationPassword(event.target.value);
        dispatch(checkConfirmationPassword(password, event.target.value));
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userInput: UserInput = {
            username: userName,
            email: email,
            password: password,
            confirmationPassword: confirmationPassword,
        };

        dispatch(
            registerUser({
                userGatewayInterface: dependencyContainer.get<UserGatewayApi>('UserGatewayApi'),
                userInput: userInput,
            }),
        );
    };

    return (
        <>
            <Typography>Bienvenue !</Typography>
            <Typography component="h1">Créer un compte</Typography>
            <form onSubmit={onSubmitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField
                    label="Adresse email"
                    variant="outlined"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    label="Nom d'utilisateur"
                    variant="outlined"
                    required
                    value={userName}
                    error={!isUsernameValid}
                    onChange={onChangeUsername}
                    helperText={isUsernameValid ? '' : "Le nom d'utilisateur doit comporter au moins deux caractères"}
                />
                <TextField
                    label="Mot de passe"
                    variant="outlined"
                    type="password"
                    error={!isPasswordValid}
                    required
                    value={password}
                    onChange={onChangePassword}
                    helperText="Le mot de passe doit faire au moins 12 caractères, doit contenir au moins une majuscule, un chiffre et un caractère spécial."
                />
                <TextField
                    label="Confirmation du mot de passe"
                    variant="outlined"
                    type="password"
                    error={!arePasswordsEqual}
                    required
                    value={confirmationPassword}
                    onChange={onChangeConfirmationPassword}
                    helperText={arePasswordsEqual ? '' : 'Les mots de passe ne correspondent pas'}
                />
                <Button type="submit" variant="contained">
                    Envoyer
                </Button>
            </form>
        </>
    );
}

export default Register;
