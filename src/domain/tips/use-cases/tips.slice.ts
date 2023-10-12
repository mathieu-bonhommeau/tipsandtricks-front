import { createSlice } from "@reduxjs/toolkit";
import { Tips } from "../models/tips.model.ts";
import { getTips } from "./tips.actions.ts";


export interface TipsState {
    data: Tips[];
    error: Boolean;
    lengthPerPage: number
    totalTips: number
    loading: boolean
}


const initialState: TipsState = {
    data: [],
    error: false,
    lengthPerPage: 2,
    totalTips: 0,
    loading: false

};


export const tipsSlice = createSlice({
    name: 'tips',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTips.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTips.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data;
                state.lengthPerPage = action.payload.lengthPerPage
                state.totalTips = action.payload.total
            })
            .addCase(getTips.rejected, (state) => {
                state.error = true
            })

    },




});

export const { resetError } = tipsSlice.actions;
export const tipsReducer = tipsSlice.reducer;


