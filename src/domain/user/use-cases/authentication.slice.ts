import { createSlice } from '@reduxjs/toolkit';
import { AuthenticationState } from '../models/authentication.model.ts';
import { loginUser, logoutUser, reconnectUser, refreshToken } from './authentication.actions.ts';

import { APIErrorMessages } from '../models/user.model.ts';

const initialState: AuthenticationState = {
    user: null,
    credentialsError: false,
    unknownServerLoginError: false,
    isReconnecting: true,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        resetErrorState: (state) => {
            state.credentialsError = false;
            state.unknownServerLoginError = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            switch (action.error.message) {
                case APIErrorMessages.WRONG_CREDENTIALS:
                    state.unknownServerLoginError = false;
                    state.credentialsError = true;
                    break;
                default:
                    state.unknownServerLoginError = true;
                    state.credentialsError = false;
            }
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
        });
        builder.addCase(reconnectUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isReconnecting = false;
        });
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.user = action.payload
        })
    },
});

// Action creators are generated for each case reducer function
export const { resetErrorState } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
