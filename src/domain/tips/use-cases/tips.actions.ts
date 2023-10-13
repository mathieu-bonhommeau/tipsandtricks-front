import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse, TipsGatewayInterface } from '../port/tips-gateway.interface.ts';
import { Tips } from '../models/tips.model.ts';
// Empty type-import to clue TS into redux toolkit action type
import type {} from 'redux-thunk/extend-redux';

export type tipsParams = {
    tipsGatewayInterface: TipsGatewayInterface;
    page: number;
    length: number;
};

export const getTips = createAsyncThunk(
    'tips/getTips',
    async ({ tipsGatewayInterface, page, length }: tipsParams): Promise<PaginatedResponse<Tips>> => {
        return await tipsGatewayInterface.getTips(page, length);
    },
);

export const resetError = () => ({
    type: 'tips/resetError',
});
