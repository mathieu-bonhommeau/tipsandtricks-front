import { Container } from '@mui/material';
import AppHeader from './AppHeader.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import { reconnectUser } from '../../domain/user/use-cases/authentication.actions.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';

function AppWrapper() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(
            reconnectUser({
                gatewayInterface: dependencyContainer.get<UserGatewayInterface>('UserGateway'),
                navigate,
            }),
        );
    }, [dispatch, navigate]);

    return (
        <>
            <AppHeader />
            <Container style={{ marginTop: '15px' }} maxWidth={'xl'}>
                <Outlet />
            </Container>
        </>
    );
}

export default AppWrapper;
