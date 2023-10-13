import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../router/router.tsx';

function Home() {
    return (
        <Container sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            <Button variant="contained" color="primary">
                <Link to={routes.register} style={{ color: 'white', textDecoration: 'none' }}>
                    S'inscrire
                </Link>
            </Button>
            <Button variant="contained" color="primary">
                <Link to={routes.login} style={{ color: 'white', textDecoration: 'none' }}>
                    Se connecter
                </Link>
            </Button>
        </Container>
    );
}

export default Home;
