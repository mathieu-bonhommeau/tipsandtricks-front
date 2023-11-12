import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationState } from '../models/registration.model.ts';
import { registerUserAsync } from './registration.actions.ts';
import { User } from '../models/user.model.ts';

const initialState: RegistrationState = {
    user: null,
    emailValidity: true,
    passwordValidity: true,
    passwordsEquality: true,
    usernameValidity: true,
    usernameAlreadyUsedError: false,
    emailAlreadyUsedError: false,
    unknownServerError: false,
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        emailValidity: (state: RegistrationState, action: PayloadAction<boolean>) => {
            state.emailValidity = action.payload;
        },
        passwordValidity: (state: RegistrationState, action: PayloadAction<boolean>) => {
            state.passwordValidity = action.payload;
        },
        passwordsEquality: (state: RegistrationState, action: PayloadAction<boolean>) => {
            state.passwordsEquality = action.payload;
        },
        usernameValidity: (state: RegistrationState, action: PayloadAction<boolean>) => {
            state.usernameValidity = action.payload;
        },
        resetUsernameAlreadyUsedError: (state: RegistrationState) => {
            state.usernameAlreadyUsedError = false;
        },
        resetEmailAlreadyUsedError: (state: RegistrationState) => {
            state.emailAlreadyUsedError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAsync.fulfilled, (state: RegistrationState, action) => {
                state.user = action.payload as User | null;
                state.unknownServerError = false;
            })
            .addCase(registerUserAsync.rejected, (state: RegistrationState, action) => {
                switch (action.error.code) {
                    case 'USERNAME_ALREADY_USED':
                        state.usernameAlreadyUsedError = true;
                        state.unknownServerError = false;
                        break;
                    case 'EMAIL_ALREADY_USED':
                        state.emailAlreadyUsedError = true;
                        state.unknownServerError = false;
                        break;
                    default:
                        state.usernameAlreadyUsedError = false;
                        state.emailAlreadyUsedError = false;
                        state.unknownServerError = true;
                }
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    emailValidity,
    passwordValidity,
    passwordsEquality,
    usernameValidity,
    resetUsernameAlreadyUsedError,
    resetEmailAlreadyUsedError,
} = registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;
