import { createSlice } from '@reduxjs/toolkit';
import { TipsState } from '../models/tips.model.ts';
import { Tips } from '../models/tips.model.ts';
import { createTips, deleteTip, getTips, shareTip } from './tips.actions.ts';
import { Post } from '../../posts/models/post.model.ts';

export interface TipsState {
    data: Tips[];
    shareTips: Post | null;
    error: boolean;
    totalTips: number;
    loading: boolean;
}

const initialState: TipsState = {
    data: [],
    shareTips: null,
    error: false,
    totalTips: 0,
    loading: false,
    createTipsError: false,
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
                state.data = action.payload?.data || [];
                state.totalTips = action.payload?.total || 0;
            })
            .addCase(getTips.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(createTips.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
            })
            .addCase(createTips.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTips.rejected, (state) => {
                state.loading = false;
                state.createTipsError = true;
            })
            .addCase(deleteTip.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTip.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.filter((tips) => {
                    return tips.id !== action.payload;
                });
            })
            .addCase(deleteTip.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(shareTip.pending, (state) => {
                state.loading = true;
            })
            .addCase(shareTip.fulfilled, (state, action) => {
                state.loading = false;
                state.shareTips = action.payload;
            })
            .addCase(shareTip.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { resetError } = tipsSlice.actions;
export const tipsReducer = tipsSlice.reducer;
