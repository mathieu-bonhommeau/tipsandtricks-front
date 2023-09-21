import { Button, FormControl, TextField, Typography } from '@mui/material';
import { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    return (
        <>
            <Typography>Bienvenue !</Typography>
            <Typography component="h1">Créer un compte</Typography>
            <FormControl>
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
                <Button variant="contained">Envoyer</Button>
            </FormControl>
        </>
    );
}

export default Register;
