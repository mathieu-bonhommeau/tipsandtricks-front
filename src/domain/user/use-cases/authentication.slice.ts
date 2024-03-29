import { createSlice } from '@reduxjs/toolkit';
import { AuthenticationState } from '../models/authentication.model.ts';
import { loginUser, logoutUser, reconnectUser } from './authentication.actions.ts';

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
        resetErrorState: (state: AuthenticationState) => {
            state.credentialsError = false;
            state.unknownServerLoginError = false;
        },
        deconnectUser: (state: AuthenticationState) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state: AuthenticationState, action) => {
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state: AuthenticationState, action) => {
            switch (action.error.code) {
                case 'WRONG_CREDENTIALS_ERROR':
                    state.unknownServerLoginError = false;
                    state.credentialsError = true;
                    break;
                default:
                    state.unknownServerLoginError = true;
                    state.credentialsError = false;
            }
        });
        builder.addCase(logoutUser.fulfilled, (state: AuthenticationState) => {
            state.user = null;
        });
        builder.addCase(reconnectUser.fulfilled, (state: AuthenticationState, action) => {
            state.user = action.payload;
            state.isReconnecting = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { resetErrorState, deconnectUser } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
