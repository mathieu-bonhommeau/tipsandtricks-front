import { configureStore } from '@reduxjs/toolkit';
import { registrationReducer } from './user/use-cases/registration.slice.ts';
export const store = configureStore({
    reducer: {
        registration: registrationReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the tips itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
