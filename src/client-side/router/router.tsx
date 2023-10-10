import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';
import Feed from '../pages/Feed.tsx';
import TipsCollection from '../pages/TipsCollection.tsx';

export default createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/inscription',
        element: <Register />,
    },
    {
        path: '/connexion',
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
