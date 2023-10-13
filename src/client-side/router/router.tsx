import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';
import Feed from '../pages/Feed.tsx';
import TipsCollection from '../pages/TipsCollection.tsx';
import PrivateRoute from '../wrappers/privateRoute.tsx';
import AppWrapper from '../components/AppWrapper.tsx';

export enum routes {
    homepage = '/',
    register = '/inscription',
    login = '/connexion',
    feed = '/flux',
    tipsBoard = '/mes-tips'
}

const router = createBrowserRouter([
    {
        path: routes.homepage,
        element: <AppWrapper />,
        children: [
            {
                index: true,
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
                path: routes.feed,
                element: <Feed />,
            },

            {
                path: routes.tipsBoard,
                element: <PrivateRoute />,
                children: [
                    { index: true, element: <TipsCollection /> }
                ]
            },
        ],
    },


]);


export default router