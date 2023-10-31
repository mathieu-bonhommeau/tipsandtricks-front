import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';
import Feed from '../pages/Feed.tsx';
import AppWrapper from '../components/AppWrapper.tsx';
import TipsBoard from '../pages/TipsBoard.tsx';
import PrivateRoute from '../wrappers/privateRoute.tsx';
import PostDetails from '../pages/PostDetails.tsx';

export enum routes {
    homepage = '/',
    register = '/inscription',
    login = '/connexion',
    feed = '/flux',
    postDetails = '/flux/:id/:slug/',
    tipsBoard = '/mes-tips',
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
                path: routes.postDetails,
                element: <PostDetails />,
            },

            {
                path: routes.tipsBoard,
                element: <PrivateRoute />,
                children: [
                    {
                        index: true,
                        element: <TipsBoard />,
                    },
                ],
            },
        ],
    },
]);

export default router;
