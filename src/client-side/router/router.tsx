import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';

export enum routes {
    homepage = '/',
    register = '/inscription',
    login = '/connexion',
}

const router = createBrowserRouter([
    {
        path: routes.homepage,
        element: <HomePage />,
    },
    {
        path: routes.register,
        element: <Register />,
    },
    {
        path: routes.login,
        element: <Login />,
    },
]);

export default router;
