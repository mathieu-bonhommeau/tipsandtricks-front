import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../model/user.model.ts';

const initialState: UserState = {
    registrationError: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: () => {},
});

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions;

export const userReducer = userSlice.reducer;
