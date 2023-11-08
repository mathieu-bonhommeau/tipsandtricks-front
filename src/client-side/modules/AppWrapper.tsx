import {Container, useTheme} from '@mui/material';
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
            <Container style={{ margin: '15px auto 50px', minHeight: '80vh'}} maxWidth={'xl'}>
                <Outlet />
            </Container>
            <AppFooter />
        </div>
    );
}

export default AppWrapper;
