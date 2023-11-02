import { PostState } from '../models/post.model.ts';
import {getPost, getPosts, saveTips, getMorePosts} from './post.actions.ts';
import { createSlice } from '@reduxjs/toolkit';

const initialState: PostState = {
    data: [],
    savedTips: null,
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
                state.data = action.payload?.data || [];
            })
            .addCase(getPosts.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getMorePosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMorePosts.fulfilled, (state, action) => {
                state.loading = false;
                const newPosts = action.payload?.data || [];
                state.data = [...state.data, ...newPosts];
            })
            .addCase(getMorePosts.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(saveTips.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveTips.fulfilled, (state, action) => {
                state.loading = false;
                state.savedTips = action.payload;
            })
            .addCase(saveTips.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false;
                const newPost = action.payload;
                state.data = [newPost];
            })
            .addCase(getPost.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    },
});

export const { resetError } = postSlice.actions;
export const postReducer = postSlice.reducer;
