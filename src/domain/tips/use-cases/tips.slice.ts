import { createSlice } from "@reduxjs/toolkit";
import { Tips } from "../models/tips.model.ts";
import { getTips } from "./tips.actions.ts";


export interface TipsState {
    tips: Tips[] | [];
    error: string | null | undefined;
}


const initialState: TipsState = {
    tips: [],
    error: "",
};


export const tipsSlice = createSlice({
    name: 'tips',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTips.fulfilled, (state, action) => {
                state.tips = action.payload;
            })
            .addCase(getTips.rejected, (state, action) => {
                state.error = action.error.message
            })

    },




});


export const tipsReducer = tipsSlice.reducer;


