import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { UserInput } from '../../domain/user/port/user.interface.ts';
import { useAppDispatch } from '../utils/dispatch.ts';
import { registerUser } from '../../domain/user/use-case/user.actions.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { UserApi } from '../../server-side/user/user.api.ts';

function Register() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const dispatch = useAppDispatch();

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submit');
        const userInput: UserInput = {
            username: userName,
            email: email,
            password: password,
        };
        dispatch(registerUser({ userInterface: dependencyContainer.get<UserApi>('UserApi'), userInput: userInput }));
    };

    return (
        <>
            <Typography>Bienvenue !</Typography>
            <Typography component="h1">Créer un compte</Typography>
            <form onSubmit={onSubmitHandler}>
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
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                    label="Confirmation du mot de passe"
                    variant="outlined"
                    type="password"
                    required
                    value={confirmationPassword}
                    onChange={(event) => setConfirmationPassword(event.target.value)}
                />
                <Button type="submit" variant="contained">
                    Envoyer
                </Button>
            </form>
        </>
    );
}

export default Register;
