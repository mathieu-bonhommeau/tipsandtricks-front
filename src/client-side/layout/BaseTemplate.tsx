import { Container } from '@mui/material';
import { ReactElement } from 'react';
import AppHeader from '../components/AppHeader.tsx';

function BaseTemplate({ children }: { children: ReactElement }) {
    return (
        <>
            <AppHeader />
            <Container style={{ marginTop: '15px' }} maxWidth={'xl'}>
                {children}
            </Container>
        </>
    );
}

export default BaseTemplate;
