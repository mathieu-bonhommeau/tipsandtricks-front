import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import Feed from '../pages/Feed.tsx';
import AppWrapper from '../modules/AppWrapper.tsx';
import TipsBoard from '../pages/TipsBoard.tsx';
import PrivateRoute from '../wrappers/privateRoute.tsx';
import PostDetails from '../pages/PostDetails.tsx';

export enum routes {
    homepage = '/',
    register = '/inscription',
    login = '/connexion',
    feed = '/flux',
    postDetails = '/flux/:id',
    tipsBoard = '/mes-tips',
}

const router = createBrowserRouter([
    {
        path: routes.homepage,
        element: <AppWrapper />,
        children: [
            {
                index: true,
                element: <Home formType={'register'} />,
            },
            {
                path: routes.login,
                element: <Home formType={'login'} />,
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
