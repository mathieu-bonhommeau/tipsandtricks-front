import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function App() {
    return (
        <>
            <Button variant="contained">
                <Link to="/inscription">S'inscrire</Link>
            </Button>
        </>
    );
}

export default App;
