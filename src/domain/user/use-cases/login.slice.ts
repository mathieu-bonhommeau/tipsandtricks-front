import { createSlice } from '@reduxjs/toolkit';
import { LoginState } from '../models/login.model.ts';
import { loginUser } from './login.actions.ts';

import { APIErrorMessages } from '../models/user.model.ts';

const initialState: LoginState = {
    user: null,
    credentialsError: false,
    unknownError: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetErrorState: (state) => {
            state.credentialsError = false;
            state.unknownError = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            switch (action.error.message) {
                case APIErrorMessages.WRONG_CREDENTIALS:
                    state.unknownError = false;
                    state.credentialsError = true;
                    break;
                default:
                    state.unknownError = true;
                    state.credentialsError = false;
            }
        });
    },
});

// Action creators are generated for each case reducer function
export const { resetErrorState } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
