import { Container } from '@mui/material';
import AppHeader from '../components/AppHeader.tsx';
import { Outlet } from 'react-router-dom';

function BaseTemplate() {
    return (
        <>
            <AppHeader />
            <Container style={{ marginTop: '15px' }} maxWidth={'xl'}>
                <Outlet />
            </Container>
        </>
    );
}

export default BaseTemplate;
