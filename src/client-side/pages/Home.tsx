import {Button, Container} from '@mui/material';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import {routes} from "../router/router.tsx";


function Home() {
    return (
            <Container sx={{ display: 'flex', gap: 3, justifyContent: 'center', width: '100%'}}>
                <Box sx={{ width: '50%'}} >
                    <Box
                        component="img"
                        sx={{
                            width: '50%',
                        }}
                        alt="Home picture"
                        src="/home_picture.png"
                    />
                </Box>

                <Box sx={{ width: '50%'}}>
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
                </Box>

            </Container>
    );
}

export default Home;

