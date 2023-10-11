import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Button variant="contained">
            <Link to="/inscription">S'inscrire</Link>
        </Button>
    );
}

export default Home;
