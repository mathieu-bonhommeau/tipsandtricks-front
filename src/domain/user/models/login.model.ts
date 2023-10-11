import { User } from './user.model.ts';

export interface LoginState {
    user: User | null;
    credentialsError: boolean;
    unknownError: boolean;
}

export type LoginUserInput = {
    email: string;
    password: string;
};
