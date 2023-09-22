import { User } from './user.model.ts';

export interface RegistrationState {
    user: User | null;
    passwordValidity: boolean;
    passwordsEquality: boolean;
    usernameValidity: boolean;
}

export type UserInput = {
    username: string;
    email: string;
    password: string;
    confirmationPassword: string;
};
