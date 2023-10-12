import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse, TipsGatewayInterface } from '../port/tips-gateway.interface.ts';
import { Tips } from '../models/tips.model.ts';
// Empty type-import to clue TS into redux toolkit action type
import type { } from 'redux-thunk/extend-redux';


export type tipsParams = {
    tipsGatewayInterface: TipsGatewayInterface;
    page: number;
    length: number
};




export const getTips = createAsyncThunk(
    'tips/getTips',
    async ({ tipsGatewayInterface, page, length }: tipsParams): Promise<PaginatedResponse<Tips>> => {
        try {
            const result = await tipsGatewayInterface.getTips(page, length);
            return result;
        } catch (error: unknown) {
            if (error) {
                throw error;
            }
            return { page, lengthPerPage: length, total: 0, data: [] };
        }
    },
);


export const resetError = () => ({
    type: 'tips/resetError'
});




