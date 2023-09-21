import React from 'react';
import ReactDOM from 'react-dom/client';
import './client-side/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './client-side/pages/Home.tsx';
import Register from './client-side/pages/Register.tsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './client-side/theme.ts';
import { Provider } from 'react-redux';
import { store } from './domain/store.ts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },

    {
        path: '/inscription',
        element: <Register />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);
