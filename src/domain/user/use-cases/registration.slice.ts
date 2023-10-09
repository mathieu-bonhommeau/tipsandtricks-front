import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APIErrorMessages, RegistrationState } from '../models/registration.model.ts';
import { registerUserAsync } from './registration.actions.ts';

const initialState: RegistrationState = {
    user: null,
    passwordValidity: true,
    passwordsEquality: true,
    usernameValidity: true,
    usernameAlreadyUsedError: false,
    emailAlreadyUsedError: false,
    unknownServerError: false,
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
        resetUsernameAlreadyUsedError: (state) => {
            state.usernameAlreadyUsedError = false;
        },
        resetEmailAlreadyUsedError: (state) => {
            state.emailAlreadyUsedError = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.unknownServerError = false;
        });
        builder.addCase(registerUserAsync.rejected, (state, action) => {
            console.log('action.error.message :', action.error.message);
            switch (action.error.message) {
                case APIErrorMessages.USERNAME_ALREADY_USED:
                    state.usernameAlreadyUsedError = true;
                    break;
                case APIErrorMessages.EMAIL_ALREADY_USED:
                    state.emailAlreadyUsedError = true;
                    break;
                default:
                    state.unknownServerError = true;
                    break;
            }
        });
    },
});

// Action creators are generated for each case reducer function
export const {
    passwordValidity,
    passwordsEquality,
    usernameValidity,
    resetUsernameAlreadyUsedError,
    resetEmailAlreadyUsedError,
} = registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;
