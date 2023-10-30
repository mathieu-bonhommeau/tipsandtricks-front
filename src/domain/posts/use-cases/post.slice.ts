import { PostState } from '../models/post.model.ts';
import { getPosts } from './post.actions.ts';
import { createSlice } from '@reduxjs/toolkit';

const initialState: PostState = {
    data: [],
    error: false,
    loading: false,
};

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                const newPosts = action.payload?.data || [];
                state.data = [...state.data, ...newPosts];
            })
            .addCase(getPosts.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { resetError } = postSlice.actions;
export const postReducer = postSlice.reducer;
