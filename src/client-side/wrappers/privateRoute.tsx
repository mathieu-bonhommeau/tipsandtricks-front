import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { Outlet, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const PrivateRoute = () => {
    const user = useSelector((state: RootState) => state.authentication.user);
    const isReconnecting = useSelector((state: RootState) => state.authentication.isReconnecting);

    if (isReconnecting) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (user !== null) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;
