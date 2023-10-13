import { User } from './user.model.ts';

export interface AuthenticationState {
    user: User | null;
    credentialsError: boolean;
    unknownServerLoginError: boolean;
    isReconnecting: boolean;
}

export type LoginUserInput = {
    email: string;
    password: string;
};
