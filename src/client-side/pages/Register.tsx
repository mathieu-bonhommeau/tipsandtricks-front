import { Box, Button, Container, TextField, Typography } from '@mui/material';
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
import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { Link } from 'react-router-dom';
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

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userInput: UserInput = {
            username: userName,
            email: email,
            password: password,
            confirmationPassword: confirmationPassword,
        };

        await dispatch(
            registerUser({
                userGatewayInterface: dependencyContainer.get<UserGatewayInterface>('UserGateway'),
                userInput: userInput,
            }),
        );
    };

    return (
        <Container maxWidth={'md'}>
            <Typography>Bienvenue !</Typography>
            <Box sx={{ m: 3 }} />
            <Typography component="h1">Créer un compte</Typography>
            <Box sx={{ m: 3 }} />
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
                <Button
                    type="submit"
                    variant="contained"
                    style={{ maxWidth: '150px', alignItems: 'right' }}
                    color="primary"
                >
                    Envoyer
                </Button>
            </form>
            <Box sx={{ m: 3 }} />
            <Typography component="p">
                {'Vous avez déjà un compte ? '}
                <Link color="inherit" to={'/connexion'}>
                    {'Se connecter'}
                </Link>
            </Typography>
        </Container>
    );
}

export default Register;
