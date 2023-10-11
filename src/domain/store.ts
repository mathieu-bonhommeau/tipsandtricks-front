import { configureStore } from '@reduxjs/toolkit';
import { registrationReducer } from './user/use-cases/registration.slice.ts';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { loginReducer } from './user/use-cases/login.slice.ts';

export const setupStore = (): ToolkitStore => {
    return configureStore({
        reducer: {
            registration: registrationReducer,
            login: loginReducer,
        },
    });
};

export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the tips itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
