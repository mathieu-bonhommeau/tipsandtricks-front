import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIErrorMessages, User } from '../models/user.model.ts';
import { UserGatewayInterface } from '../port/user-gateway.interface.ts';
import { LoginUserInput } from '../models/authentication.model.ts';
import { NavigateFunction } from 'react-router-dom';

export type loginUserParams = {
    userGatewayInterface: UserGatewayInterface;
    userInput: LoginUserInput;
    navigate: NavigateFunction;
};

type logoutUserParams = {
    userGatewayInterface: UserGatewayInterface;
    navigate: NavigateFunction;
};

type userGatewayParam = {
    userGatewayInterface: UserGatewayInterface;
};

export const loginUser = createAsyncThunk(
    'authentication/loginUser',
    async ({ userGatewayInterface, userInput, navigate }: loginUserParams): Promise<User | null> => {
        try {
            const result = await userGatewayInterface.loginUser(userInput);
            navigate('/flux');
            return result;
        } catch (error: unknown) {
            if (error) {
                throw error;
            }
            return null;
        }
    },
);

export const logoutUser = createAsyncThunk(
    'authentication/logoutUser',
    async ({ userGatewayInterface, navigate }: logoutUserParams): Promise<void> => {
        try {
            await userGatewayInterface.logoutUser();
            navigate('/');
        } catch (error: unknown) {
            if (error) {
                throw error;
            }
        }
    },
);

export const reconnectUser = createAsyncThunk(
    'authentication/reconnectUser',
    async ({ userGatewayInterface }: userGatewayParam): Promise<User | null> => {
        try {
            const user = await userGatewayInterface.reconnectUser();
            if (!user) {
                //TODO: attemps to refresh-token
                return null;
            }
            return user;
        } catch {
            throw new Error(APIErrorMessages.RECONNECT_UNKNOWN_ERROR);
        }
    },
);
