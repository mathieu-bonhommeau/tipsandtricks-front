import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { LoginUserInput } from '../../domain/user/models/login.model.ts';
import { useAppDispatch } from '../utils/dispatch.ts';
import { loginUser } from '../../domain/user/use-cases/login.actions.ts';
import { resetErrorState } from '../../domain/user/use-cases/login.slice.ts';
import { Link, useNavigate } from 'react-router-dom';
import BaseTemplate from '../layout/BaseTemplate.tsx';
import { routes } from '../router/router.tsx';

function Login() {
    const isCredentialsError = useSelector((state: RootState) => state.login.credentialsError);
    const isUnknownError = useSelector((state: RootState) => state.login.unknownError);
    const userNewlyRegistered = useSelector((state: RootState) => state.registration.user);
    const emailInitValue = userNewlyRegistered ? userNewlyRegistered.email : '';

    const [email, setEmail] = useState(emailInitValue);
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(resetErrorState());

        const userInput: LoginUserInput = {
            email: email,
            password: password,
        };

        await dispatch(
            loginUser({
                userGatewayInterface: dependencyContainer.get<UserGatewayInterface>('UserGateway'),
                userInput: userInput,
                navigate: navigate,
            }),
        );
    };

    return (
        <BaseTemplate>
            <Container maxWidth={'md'}>
                <Typography component="h1">Se connecter</Typography>
                {userNewlyRegistered && (
                    <Alert severity="success">Votre compte a bien été créé ! Veuillez vous connecter.</Alert>
                )}
                <form
                    onSubmit={onSubmitHandler}
                    style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0' }}
                >
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {isCredentialsError && <Alert severity="error">Les identifiants sont incorrects</Alert>}
                    {isUnknownError && (
                        <Alert severity="error">Erreur inconnue, veuillez réessayer ultérieurement</Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        style={{ maxWidth: '150px', alignItems: 'right' }}
                        color="primary"
                    >
                        Envoyer
                    </Button>
                </form>
                <Typography component="p">
                    Vous n'avez pas encore de compte ?{' '}
                    <Link color="inherit" to={routes.register}>
                        S'inscrire
                    </Link>
                </Typography>
            </Container>
        </BaseTemplate>
    );
}

export default Login;
