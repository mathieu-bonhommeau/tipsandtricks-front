import { createAsyncThunk } from '@reduxjs/toolkit';
import { TipsGatewayInterface } from '../port/tips-gateway.interface.ts';
import { Tips, TipsInput } from '../models/tips.model.ts';
// Empty type-import to clue TS into redux toolkit action type
import type {} from 'redux-thunk/extend-redux';
import { handleErrors, Params } from '../../core/handlers/handle.errors.ts';
import { PaginatedResponse } from '../../core/models/paginatedResponse.ts';
import { InputCreatePost, Post } from '../../posts/models/post.model.ts';

export type TipsParams = {
    params: Params;
    page: number;
    length: number;
};

export type CreateTipParams = {
    params: Params;
    tips: TipsInput;
};


export type TipsDelete = {
    params: Params;
    tipsId: number;
};

export type TipsShare = {
    params: Params;
    tipsToShare: InputCreatePost;
};

export const getTips = createAsyncThunk(
    'tips/getTips',
    async ({ params, page, length }: TipsParams, { dispatch }): Promise<PaginatedResponse<Tips>> => {
        return (await handleErrors(
            async () => {
                return await (params.gatewayInterface as TipsGatewayInterface).getTips(page, length);
            },
            params,
            dispatch,
        )) as PaginatedResponse<Tips>;
    },
);


export const createTips = createAsyncThunk(
    'tips/createTip',
    async ({ params, tips }: CreateTipParams, { dispatch }): Promise<Tips> => {
        return (await handleErrors(
            async () => {
                return await (params.gatewayInterface as TipsGatewayInterface).createTips(tips);
            },
            params,
            dispatch,
        )) as Tips;
    },
);
export const deleteTip = createAsyncThunk(
    'tips/deleteTips',
    async ({ params, tipsId }: TipsDelete, { dispatch }): Promise<number> => {
        return (await handleErrors(
            async () => {
                return await (params.gatewayInterface as TipsGatewayInterface).deleteTip(tipsId);
            },
            params,
            dispatch,
        )) as number;
    },
);

export const shareTip = createAsyncThunk(
    'tips/shareTips',
    async ({ params, tipsToShare }: TipsShare, { dispatch }): Promise<Post> => {
        return (await handleErrors(
            async () => {
                const response = await (params.gatewayInterface as TipsGatewayInterface).shareTips(tipsToShare);
                params.navigate!(`/flux/${response.id}-${response.slug}`);
                return response;
            },
            params,
            dispatch,
        )) as Post;
    },
);

export const resetError = () => ({
    type: 'tips/resetError',
});
