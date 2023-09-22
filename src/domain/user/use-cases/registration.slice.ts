import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationState } from '../models/registration.model.ts';

const initialState: RegistrationState = {
    passwordValidity: true,
    passwordsEquality: true,
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
    },
    extraReducers: () => {},
});

// Action creators are generated for each case reducer function
export const { passwordValidity, passwordsEquality } = registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;
