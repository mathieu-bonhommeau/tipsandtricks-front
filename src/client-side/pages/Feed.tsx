
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import BaseTemplate from '../layout/BaseTemplate';

function Feed() {


    return (
        <BaseTemplate>
            <Button variant="contained">
                <Link to="/mes-tips">mes Tips</Link>
            </Button>
        </BaseTemplate>

    );
}

export default Feed;
