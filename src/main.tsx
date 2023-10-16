import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './client-side/reset.css';
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
