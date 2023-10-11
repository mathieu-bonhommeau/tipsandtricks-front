import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';
import Feed from '../pages/Feed.tsx';
import TipsCollection from '../pages/TipsCollection.tsx';

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

    {
        path: '/fil-actus',
        element: <Feed />,
    },

    {
        path: '/mes-tips',
        element: <TipsCollection />,
    },
]);


export default router