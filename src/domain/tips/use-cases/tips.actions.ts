import { createAsyncThunk } from '@reduxjs/toolkit';
import { TipsGatewayInterface } from '../port/tips-gateway.interface.ts';
import { Tips } from '../models/tips.model.ts';
// Empty type-import to clue TS into redux toolkit action type
import type { } from 'redux-thunk/extend-redux';


export type tipsParams = {
    tipsGatewayInterface: TipsGatewayInterface;
};




export const getTips = createAsyncThunk(
    'tips/getTips',
    async ({ tipsGatewayInterface }: tipsParams): Promise<Tips[] | []> => {
        try {
            const result = await tipsGatewayInterface.getTips();
            return result;
        } catch (error: unknown) {
            if (error) {
                throw error;
            }
            return [];
        }
    },
);



export const handleCopyToClipboard = async (command: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(command);
        return true;
    } catch (err) {
        return false;
    }

};

