import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function App() {
    return (
        <>
            <Button variant="contained">
                <Link to="/inscription">S'inscrire</Link>
            </Button>

            <Button variant="contained">
                <Link to="/fil-actus">Continuer sans compte</Link>
            </Button>
        </>
    );
}

export default App;
