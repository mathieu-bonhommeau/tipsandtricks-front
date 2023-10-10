import { Button, Container, Box, Typography, TextField, FormControlLabel, Checkbox, Grid, Link } from "@mui/material";


function Login() {
    return (

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de Passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Se Connecter
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/inscription" variant="body2">
                                {"Vous n'avez pas de compte? Créez en un"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    )
}

export default Login;
