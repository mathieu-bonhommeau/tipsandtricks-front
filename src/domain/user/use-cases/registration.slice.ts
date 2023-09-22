import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationState } from '../models/registration.model.ts';
import { registerUserAsync } from './registration.actions.ts';

const initialState: RegistrationState = {
    user: null,
    passwordValidity: true,
    passwordsEquality: true,
    usernameValidity: true,
};

export const registrationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        passwordValidity: (state, action: PayloadAction<boolean>) => {
            state.passwordValidity = action.payload;
        },
        passwordsEquality: (state, action: PayloadAction<boolean>) => {
            state.passwordsEquality = action.payload;
        },
        usernameValidity: (state, action: PayloadAction<boolean>) => {
            state.usernameValidity = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserAsync.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { passwordValidity, passwordsEquality, usernameValidity } = registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;
