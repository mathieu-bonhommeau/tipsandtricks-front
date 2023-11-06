import { createAsyncThunk } from '@reduxjs/toolkit';
import {emailValidity, passwordsEquality, passwordValidity, usernameValidity} from './registration.slice.ts';
import { AppDispatch, RootState } from '../../store.ts';
// Empty type-import to clue TS into redux toolkit action type
import type {} from 'redux-thunk/extend-redux';
import { RegistrationUserInput } from '../models/registration.model.ts';
import { handleErrors, Params } from '../../core/handlers/handle.errors.ts';
import { UserGatewayInterface } from '../port/user-gateway.interface.ts';
import {User} from "../models/user.model.ts";

export type registerUserParams = {
    userInput: RegistrationUserInput;
    params: Params;
};

const checkEmailValidityRegex = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email)
};

const checkPasswordsEquality = (password: string, confirmationPassword: string) => {
    return password === confirmationPassword;
};

export const checkPasswordRegex = (password: string): boolean => {
    const passwordRegex = /^(?=(?:.*\d))(?=(?:.*[a-zA-Z]))(?=(?:.*[A-Z])).{12,}$/;
    return passwordRegex.test(password);
};

const checkUsernameLength = (username: string) => {
    return username.length >= 2;
};

export function checkEmailValidity(email: string) {
    return function checkEmailValidityThunk(dispatch: AppDispatch) {
        const isEmailValid = checkEmailValidityRegex(email);

        if (!isEmailValid) {
            dispatch(emailValidity(false));
        } else {
            dispatch(emailValidity(true));
        }
    };
}

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
        const arePasswordsEqual = checkPasswordsEquality(password, confirmationPassword);
        if (!arePasswordsEqual) {
            dispatch(passwordsEquality(false));
        } else {
            dispatch(passwordsEquality(true));
        }
    };
}

export function registerUser({ params, userInput }: registerUserParams) {
    return async function registerUserThunk(dispatch: AppDispatch, getState: RootState) {
        const { email, username, password, confirmationPassword } = userInput;

        dispatch(checkPasswordValidity(password));
        dispatch(checkEmailValidity(email));
        dispatch(checkConfirmationPassword(password, confirmationPassword));
        dispatch(checkUsernameValidity(username));

        const state = getState();

        if (
            state.registration.usernameValidity &&
            state.registration.passwordValidity &&
            state.registration.emailValidity &&
            state.registration.passwordsEquality
        ) {
            await dispatch(
                registerUserAsync({
                    params,
                    userInput,
                }),
            );
        }
    };
}

export const registerUserAsync = createAsyncThunk(
    'registration/registerUser',
    async ({ params, userInput }: registerUserParams, { dispatch }) => {
        return (await handleErrors(
            async () => {
                const user = await (params.gatewayInterface as UserGatewayInterface).registerUser(userInput);
                params.navigate!('/connexion', {state: {reload: false}});
                return user
            },
            params,
            dispatch,
        ));
    },
);
