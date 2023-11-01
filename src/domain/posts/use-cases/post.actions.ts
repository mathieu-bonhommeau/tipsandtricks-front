import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleErrors, Params } from '../../core/handlers/handle.errors.ts';
import { PostGatewayInterface } from '../port/post-gateway-interface.ts';
import { InfiniteResponse } from '../../core/models/infiniteResponse.ts';
import { Post } from '../models/post.model.ts';
import { Tips } from '../../tips/models/tips.model.ts';

export type PostsParams = {
    params: Params;
    start: number;
    length: number;
};

export const getPosts = createAsyncThunk(
    'post/getPosts',
    async ({ params, start, length }: PostsParams, { dispatch }): Promise<InfiniteResponse<Post>> => {
        return (await handleErrors(
            async () => {
                return await (params.gatewayInterface as PostGatewayInterface).getPosts(start, length);
            },
            params,
            dispatch,
        )) as InfiniteResponse<Post>;
    },
);

export const saveTips = createAsyncThunk(
    'post/saveTips',
    async ({ params, post }: { params: Params; post: Post }, { dispatch }): Promise<Tips> => {
        return (await handleErrors(
            async () => {
                return await (params.gatewayInterface as PostGatewayInterface).saveTips(post);
            },
            params,
            dispatch,
        )) as Tips;
    },
);
