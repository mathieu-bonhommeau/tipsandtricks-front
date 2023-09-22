import { createAsyncThunk } from '@reduxjs/toolkit';
import { passwordsEquality, passwordValidity } from './registration.slice.ts';
import { AppDispatch } from '../../store.ts';
import { UserGatewayInterface } from '../port/user-gateway.interface.ts';
import { UserInput } from '../models/registration.model.ts';
import { User } from '../models/user.model.ts';

export type registerUserParams = {
    userGatewayInterface: UserGatewayInterface;
    userInput: UserInput;
};
const checkPasswordsEquity = (password: string, confirmationPassword: string) => {
    return password === confirmationPassword;
};

export const checkPasswordValidity = (password: string) => {
    const passwordRegex = /^(?=(?:.*\d))(?=(?:.*[a-zA-Z]))(?=(?:.*[A-Z])).{12,}$/;
    return passwordRegex.test(password);
};

export function registerUser({ userGatewayInterface, userInput }: registerUserParams) {
    return async function registerUserThunk(dispatch: AppDispatch) {
        const { password, confirmationPassword } = userInput;

        const isPasswordValid = checkPasswordValidity(password);
        if (!isPasswordValid) {
            dispatch(passwordValidity(false));
        }

        const arePasswordsEqual = checkPasswordsEquity(password, confirmationPassword);
        if (!arePasswordsEqual) {
            dispatch(passwordsEquality(false));
        }

        if (isPasswordValid && arePasswordsEqual) {
            await dispatch(
                registerUserAsync({
                    userGatewayInterface: userGatewayInterface,
                    userInput: userInput,
                }),
            );
        }
    };
}

export const registerUserAsync = createAsyncThunk(
    'user/registerUser',
    async ({ userGatewayInterface, userInput }: registerUserParams): Promise<User | null> => {
        try {
            return await userGatewayInterface.registerUser(userInput);
        } catch (error: unknown) {
            if (error && typeof error === 'string') {
                throw new Error(error);
            }
            return null;
        }
    },
);
