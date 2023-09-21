import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme.ts';

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
        <App />
            <RouterProvider router={router} />
    </React.StrictMode>,
);
