import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserInput, UserInterface } from '../port/user.interface.ts';
import { passwordsEquality, passwordValidity } from './registration.slice.ts';
import { AppDispatch } from '../../store.ts';

const checkPasswordsEquity = (password: string, confirmationPassword: string) => {
    return password === confirmationPassword;
};

export const checkPasswordValidity = (password: string) => {
    const passwordRegex = /^(?=(?:.*\d))(?=(?:.*[a-zA-Z]))(?=(?:.*[A-Z])).{12,}$/;
    return passwordRegex.test(password);
};

export function registerUser({ userInterface, userInput }: { userInterface: UserInterface; userInput: UserInput }) {
    return function registerUserThunk(dispatch: AppDispatch) {
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
            dispatch(
                registerUserAsync({
                    userInterface: userInterface,
                    userInput: userInput,
                }),
            );
        }
    };
}

export const registerUserAsync = createAsyncThunk(
    'user/registerUser',
    async ({ userInterface, userInput }: { userInterface: UserInterface; userInput: UserInput }): Promise<string> => {
        try {
            console.log("passage dans l'async thunk");
            return await userInterface.registerUser(userInput);
        } catch (error: unknown) {
            if (error && typeof error === 'string') {
                throw new Error(error);
            }
            return 'Internal error';
        }
    },
);
