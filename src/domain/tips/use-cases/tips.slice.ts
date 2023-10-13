import { createSlice } from '@reduxjs/toolkit';
import { Tips } from '../models/tips.model.ts';
import { getTips } from './tips.actions.ts';

export interface TipsState {
    data: Tips[];
    error: boolean;
    totalTips: number;
    loading: boolean;
}

const initialState: TipsState = {
    data: [],
    error: false,
    totalTips: 0,
    loading: false,
};

export const tipsSlice = createSlice({
    name: 'tips',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTips.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTips.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.totalTips = action.payload.total;
            })
            .addCase(getTips.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { resetError } = tipsSlice.actions;
export const tipsReducer = tipsSlice.reducer;
