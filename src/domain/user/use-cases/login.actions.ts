import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../models/user.model.ts';
import { UserGatewayInterface } from '../port/user-gateway.interface.ts';
import { LoginUserInput } from '../models/login.model.ts';
import { NavigateFunction } from 'react-router-dom';

export type loginUserParams = {
    userGatewayInterface: UserGatewayInterface;
    userInput: LoginUserInput;
    navigate: NavigateFunction;
};

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({ userGatewayInterface, userInput, navigate }: loginUserParams): Promise<User | null> => {
        try {
            const result = await userGatewayInterface.loginUser(userInput);
            navigate('/mes-tips');
            return result;
        } catch (error: unknown) {
            if (error) {
                throw error;
            }
            return null;
        }
    },
);
