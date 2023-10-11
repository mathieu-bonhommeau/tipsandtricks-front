import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BaseTemplate from '../layout/BaseTemplate.tsx';

function Home() {
    return (
        <BaseTemplate>
            <Button variant="contained">
                <Link to="/inscription">S'inscrire</Link>
            </Button>
        </BaseTemplate>
    );
}

export default Home;
