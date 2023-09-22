import { createAsyncThunk } from '@reduxjs/toolkit';
import { passwordsEquality, passwordValidity, usernameValidity } from './registration.slice.ts';
import { AppDispatch, RootState } from '../../store.ts';
import { UserGatewayInterface } from '../port/user-gateway.interface.ts';
import { UserInput } from '../models/registration.model.ts';
import { User } from '../models/user.model.ts';
// Empty type-import to clue TS into redux toolkit action type
import type {} from 'redux-thunk/extend-redux';

export type registerUserParams = {
    userGatewayInterface: UserGatewayInterface;
    userInput: UserInput;
};
const checkPasswordsEquity = (password: string, confirmationPassword: string) => {
    return password === confirmationPassword;
};

export const checkPasswordRegex = (password: string): boolean => {
    const passwordRegex = /^(?=(?:.*\d))(?=(?:.*[a-zA-Z]))(?=(?:.*[A-Z])).{12,}$/;
    return passwordRegex.test(password);
};

const checkUsernameLength = (username: string) => {
    return username.length >= 2;
};

export function checkUsernameValidity(username: string) {
    return function checkUsernameValidityThunk(dispatch: AppDispatch) {
        const isUsernameValid = checkUsernameLength(username);

        if (!isUsernameValid) {
            dispatch(usernameValidity(false));
        } else {
            dispatch(usernameValidity(true));
        }
    };
}

export function checkPasswordValidity(password: string) {
    return function checkPasswordValidityThunk(dispatch: AppDispatch) {
        const isPasswordValid = checkPasswordRegex(password);

        if (!isPasswordValid) {
            dispatch(passwordValidity(false));
        } else {
            dispatch(passwordValidity(true));
        }
    };
}
export function checkConfirmationPassword(password: string, confirmationPassword: string) {
    return function checkConfirmationPasswordThunk(dispatch: AppDispatch) {
        const arePasswordsEqual = checkPasswordsEquity(password, confirmationPassword);
        if (!arePasswordsEqual) {
            dispatch(passwordsEquality(false));
        } else {
            dispatch(passwordsEquality(true));
        }
    };
}

export function registerUser({ userGatewayInterface, userInput }: registerUserParams) {
    return async function registerUserThunk(dispatch: AppDispatch, getState: RootState) {
        const { username, password, confirmationPassword } = userInput;

        dispatch(checkPasswordValidity(password));
        dispatch(checkConfirmationPassword(password, confirmationPassword));
        dispatch(checkUsernameValidity(username));

        const state = getState();

        if (
            state.registration.usernameValidity &&
            state.registration.passwordValidity &&
            state.registration.passwordsEquality
        ) {
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
