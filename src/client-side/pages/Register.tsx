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
    const [isPasswordWrong, setIsPasswordWrong] = useState(false);
    const [wrongConfirmationPasswordMessage, setWrongConfirmationPasswordMessage] = useState('');

    const dispatch = useAppDispatch();

    const isConfirmationPasswordEqual = (password: string, confirmationPassword: string) => {
        return password === confirmationPassword;
    };

    const isValidPassword = () => {
        const passwordRegex = /^(?=(?:.*\d))(?=(?:.*[a-zA-Z]))(?=(?:.*[A-Z])).{12,}$/;
        return passwordRegex.test(password);
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isValidPassword()) {
            setIsPasswordWrong(false);

            if (isConfirmationPasswordEqual(password, confirmationPassword)) {
                setWrongConfirmationPasswordMessage('');
                const userInput: UserInput = {
                    username: userName,
                    email: email,
                    password: password,
                };
                dispatch(
                    registerUser({ userInterface: dependencyContainer.get<UserApi>('UserApi'), userInput: userInput }),
                );
            } else {
                setWrongConfirmationPasswordMessage('Les mots de passe ne correspondent pas');
            }
        } else {
            setIsPasswordWrong(true);
        }
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
                    error={isPasswordWrong}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    helperText="Le mot de passe doit faire au moins 12 caractères, doit contenir au moins une majuscule, un chiffre et un caractère spécial."
                />
                <TextField
                    label="Confirmation du mot de passe"
                    variant="outlined"
                    type="password"
                    error={wrongConfirmationPasswordMessage !== ''}
                    required
                    value={confirmationPassword}
                    onChange={(event) => setConfirmationPassword(event.target.value)}
                    helperText={wrongConfirmationPasswordMessage}
                />
                <Button type="submit" variant="contained">
                    Envoyer
                </Button>
            </form>
        </>
    );
}

export default Register;
