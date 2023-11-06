import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../models/user.model.ts';
import { LoginUserInput } from '../models/authentication.model.ts';
import { handleErrors, Params } from '../../core/handlers/handle.errors.ts';
import { UserGatewayInterface } from '../port/user-gateway.interface.ts';

export type LoginUserParams = {
    userInput?: LoginUserInput;
    params: Params;
};

export const loginUser = createAsyncThunk(
    'authentication/loginUser',
    async ({ userInput, params }: LoginUserParams, { dispatch }): Promise<User | null> => {
        return (await handleErrors(
            async () => {
                const result = await (params.gatewayInterface as UserGatewayInterface).loginUser(userInput!);
                params.navigate!('/flux');
                return result;
            },
            params,
            dispatch,
        )) as User | null;
    },
);

export const logoutUser = createAsyncThunk(
    'authentication/logoutUser',
    async ({ params }: LoginUserParams, { dispatch }) => {
        return await handleErrors(
            async () => {
                await (params.gatewayInterface as UserGatewayInterface).logoutUser();
                params.navigate!('/connexion', {state: {reload: false}})
            },
            params,
            dispatch,
        );
    },
);

export const reconnectUser = createAsyncThunk(
    'authentication/reconnectUser',
    async (params: Params, { dispatch }): Promise<User | null> => {
        return (await handleErrors(
            async () => {
                return await (params.gatewayInterface as UserGatewayInterface).reconnectUser();
            },
            params,
            dispatch,
        )) as User | null;
    },
);

export const refreshToken = createAsyncThunk(
    'authentication/refreshToken',
    async ({ gatewayInterface }: Params): Promise<void> => {
        await (gatewayInterface as UserGatewayInterface).refreshToken();
    },
);
