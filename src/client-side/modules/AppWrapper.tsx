import {Container, Snackbar, useTheme} from '@mui/material';
import AppHeader from './AppHeader.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../utils/dispatch.ts';
import { reconnectUser } from '../../domain/user/use-cases/authentication.actions.ts';
import dependencyContainer from '../../_config/dependencies/dependencies.ts';
import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import AppFooter from "./AppFooter.tsx";

function AppWrapper() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme()

    useEffect(() => {
        dispatch(
            reconnectUser({
                gatewayInterface: dependencyContainer.get<UserGatewayInterface>('UserGateway'),
                navigate,
            }),
        );
    }, [dispatch, navigate]);

    return (
        <div style={{background: theme.palette.background.default, minHeight: '100vh', position: 'relative'}}>
            <AppHeader />
            <Container style={{ marginTop: '15px', margin: '0 auto' }} maxWidth={'xl'}>
                <Outlet />
            </Container>
            <AppFooter />
        </div>
    );
}

export default AppWrapper;
