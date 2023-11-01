import { ReactionsState } from '../models/reaction.ts';
import { createSlice } from '@reduxjs/toolkit';
import { addReaction, getReactionForLoggedUser } from './reaction.actions.ts';

const initialState: ReactionsState = {
    reactions: {},
};

export const reactionSlice = createSlice({
    name: 'reaction',
    initialState,
    reducers: {
        resetError: (state, action) => {
            state.reactions[action.payload.postId] = {
                postReaction: null,
                likes: 0,
                dislikes: 0,
                loading: false,
                error: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReactionForLoggedUser.pending, (state, action) => {
                state.reactions[action.meta.arg.postId] = {
                    postReaction: null,
                    likes: 0,
                    dislikes: 0,
                    loading: true,
                    error: false,
                };
            })
            .addCase(getReactionForLoggedUser.fulfilled, (state, action) => {
                state.reactions[action.meta.arg.postId] = {
                    postReaction: (action.payload?.reaction && action.payload.reaction) || null,
                    likes: (action.payload?.likes && action.payload?.likes) || 0,
                    dislikes: (action.payload?.dislikes && action.payload?.dislikes) || 0,
                    loading: false,
                    error: false,
                };
            })
            .addCase(getReactionForLoggedUser.rejected, (state, action) => {
                console.log('rejected');
                state.reactions[action.meta.arg.postId] = {
                    postReaction: null,
                    likes: 0,
                    dislikes: 0,
                    loading: false,
                    error: true,
                };
            })
            .addCase(addReaction.pending, (state, action) => {
                const existingReaction = state.reactions[action.meta.arg.postId];
                if (existingReaction) {
                    state.reactions[action.meta.arg.postId] = {
                        postReaction: existingReaction.postReaction,
                        likes: existingReaction.likes,
                        dislikes: existingReaction.dislikes,
                        loading: true,
                        error: false,
                    };
                    return;
                }
                state.reactions[action.meta.arg.postId] = {
                    postReaction: null,
                    likes: 0,
                    dislikes: 0,
                    loading: true,
                    error: false,
                };
            })
            .addCase(addReaction.fulfilled, (state, action) => {
                state.reactions[action.meta.arg.postId] = {
                    postReaction: (action.payload?.reaction && action.payload.reaction) || null,
                    likes: (action.payload?.likes && action.payload?.likes) || 0,
                    dislikes: (action.payload?.dislikes && action.payload?.dislikes) || 0,
                    loading: false,
                    error: false,
                };
            })
            .addCase(addReaction.rejected, (state, action) => {
                const existingReaction = state.reactions[action.meta.arg.postId];
                if (existingReaction) {
                    state.reactions[action.meta.arg.postId] = {
                        postReaction: existingReaction.postReaction,
                        likes: existingReaction.likes,
                        dislikes: existingReaction.dislikes,
                        loading: false,
                        error: true,
                    };
                    return;
                }
                state.reactions[action.meta.arg.postId] = {
                    postReaction: null,
                    likes: 0,
                    dislikes: 0,
                    loading: false,
                    error: true,
                };
            });
    },
});

export const { resetError } = reactionSlice.actions;
export const reactionReducer = reactionSlice.reducer;
