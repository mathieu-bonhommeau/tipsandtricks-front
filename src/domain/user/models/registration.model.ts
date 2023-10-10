import { User } from './user.model.ts';

export interface RegistrationState {
    user: User | null;
    passwordValidity: boolean;
    passwordsEquality: boolean;
    usernameValidity: boolean;
    usernameAlreadyUsedError: boolean;
    emailAlreadyUsedError: boolean;
    unknownServerError: boolean;
}

export type UserInput = {
    username: string;
    email: string;
    password: string;
    confirmationPassword: string;
};

export enum APIErrorMessages {
    USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
    EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}