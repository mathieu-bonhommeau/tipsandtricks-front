import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/use-case/user.slice.ts';
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the tips itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
