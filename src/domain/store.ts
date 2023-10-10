import { configureStore } from '@reduxjs/toolkit';
import { registrationReducer } from './user/use-cases/registration.slice.ts';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { tipsReducer } from './tips/use-cases/tips.slice.ts';

/*export const store = configureStore({
    reducer: {
        registration: registrationReducer,
    },
});*/

export const setupStore = (): ToolkitStore => {
    return configureStore({
        reducer: {
            registration: registrationReducer,
            tipsReducer: tipsReducer
        },
    });
};

export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the tips itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
