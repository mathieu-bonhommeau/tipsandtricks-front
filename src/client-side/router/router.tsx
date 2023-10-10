import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';

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
]);
