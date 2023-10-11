import { RegistrationUserInput } from '../models/registration.model.ts';
import { User } from '../models/user.model.ts';
import { LoginUserInput } from '../models/login.model.ts';

export interface UserGatewayInterface {
    registerUser(userInput: RegistrationUserInput): Promise<User | null>;
    loginUser(userInput: LoginUserInput): Promise<User | null>;
}
