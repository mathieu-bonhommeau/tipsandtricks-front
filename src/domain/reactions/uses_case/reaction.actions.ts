import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleErrors, Params } from '../../core/handlers/handle.errors.ts';
import ReactionGatewayInterface from '../port/reaction-gateway-interface.ts';
import { ReactionType, UserReactionWithLikesDislikes } from '../models/reaction.ts';

export type ReactionParams = {
    params: Params;
    postId: number;
};

export type AddReactionParams = ReactionParams & { reactionType: ReactionType };

export const getReactionForLoggedUser = createAsyncThunk(
    'reaction/getReactionForLoggedUser',
    async ({ params, postId }: ReactionParams, { dispatch }): Promise<UserReactionWithLikesDislikes | null> => {
        return (await handleErrors(
            async () => {
                return (
                    (await (params.gatewayInterface as ReactionGatewayInterface).getReactionForLoggedUser(postId)) ||
                    null
                );
            },
            params,
            dispatch,
        )) as UserReactionWithLikesDislikes | null;
    },
);

export const addReaction = createAsyncThunk(
    'reaction/addReaction',
    async (
        { params, postId, reactionType }: AddReactionParams,
        { dispatch },
    ): Promise<UserReactionWithLikesDislikes | null> => {
        return (await handleErrors(
            async () => {
                return await (params.gatewayInterface as ReactionGatewayInterface).addReaction(postId, reactionType);
            },
            params,
            dispatch,
        )) as UserReactionWithLikesDislikes | null;
    },
);
