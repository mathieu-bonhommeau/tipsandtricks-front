import React from 'react';
import ReactDOM from 'react-dom/client';
import './client-side/index.css';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './client-side/theme.ts';
import { Provider } from 'react-redux';
import { store } from './domain/store.ts';
import router from './client-side/router/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);
