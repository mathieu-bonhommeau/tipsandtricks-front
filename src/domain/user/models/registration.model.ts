import { User } from './user.model.ts';

export interface RegistrationState {
    user: User | null;
    emailValidity: boolean;
    passwordValidity: boolean;
    passwordsEquality: boolean;
    usernameValidity: boolean;
    usernameAlreadyUsedError: boolean;
    emailAlreadyUsedError: boolean;
    unknownServerError: boolean;
}

export type RegistrationUserInput = {
    username: string;
    email: string;
    password: string;
    confirmationPassword: string;
};
