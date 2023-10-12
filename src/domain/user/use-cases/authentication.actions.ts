import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../models/user.model.ts';
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
    async ({ userGatewayInterface, navigate }: logoutUserParams): Promise<boolean> => {
        try {
            const result = await userGatewayInterface.logoutUser();
            navigate('/');
            return result;
        } catch (error: unknown) {
            if (error) {
                throw error;
            }
            return false;
        }
    },
);
