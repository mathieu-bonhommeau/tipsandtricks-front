import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import { registerUser } from '../../domain/user/use-cases/registration.actions.ts';
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

    const dispatch = useAppDispatch();

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
                    onChange={(event) => setUserName(event.target.value)}
                />
                <TextField
                    label="Mot de passe"
                    variant="outlined"
                    type="password"
                    error={!isPasswordValid}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    helperText="Le mot de passe doit faire au moins 12 caractères, doit contenir au moins une majuscule, un chiffre et un caractère spécial."
                />
                <TextField
                    label="Confirmation du mot de passe"
                    variant="outlined"
                    type="password"
                    error={!arePasswordsEqual}
                    required
                    value={confirmationPassword}
                    onChange={(event) => setConfirmationPassword(event.target.value)}
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
