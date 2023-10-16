import { useSelector } from 'react-redux';
import { RootState } from '../../domain/store.ts';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const user = useSelector((state: RootState) => state.authentication.user);
    if (user !== null) {
        return <Outlet />;
    } else {
        return <Navigate to="/connexion" />;
    }
};

export default PrivateRoute;
