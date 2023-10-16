import { RegistrationUserInput } from '../models/registration.model.ts';
import { User } from '../models/user.model.ts';
import { LoginUserInput } from '../models/authentication.model.ts';

export interface UserGatewayInterface {
    registerUser(userInput: RegistrationUserInput): Promise<User | null>;
    loginUser(userInput: LoginUserInput): Promise<User | null>;
    logoutUser(): Promise<void>;
    reconnectUser(): Promise<User | null>;
    refreshToken(): Promise<User | null>
}
