import { configureStore } from '@reduxjs/toolkit';
import { registrationReducer } from './user/use-cases/registration.slice.ts';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { tipsReducer } from './tips/use-cases/tips.slice.ts';
import { authenticationReducer } from './user/use-cases/authentication.slice.ts';
import { postsReducer } from './posts/use-cases/post.slice.ts';
import { reactionReducer } from './reactions/uses_case/reaction.slice.ts';

export const setupStore = (): ToolkitStore => {
    return configureStore({
        reducer: {
            registration: registrationReducer,
            tipsReducer: tipsReducer,
            postsReducer: postsReducer,
            reactionReducer: reactionReducer,
            authentication: authenticationReducer,
        },
    });
};

export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the tips itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
