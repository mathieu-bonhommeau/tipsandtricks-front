import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse, TipsGatewayInterface } from '../port/tips-gateway.interface.ts';
import { Tips } from '../models/tips.model.ts';
// Empty type-import to clue TS into redux toolkit action type
import type {} from 'redux-thunk/extend-redux';
import { handleErrors, Params } from '../../core/handlers/handle.errors.ts';

export type TipsParams = {
    params: Params;
    page: number;
    length: number;
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

export const resetError = () => ({
    type: 'tips/resetError',
});
