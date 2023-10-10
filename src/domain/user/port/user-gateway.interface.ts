import { UserInput } from '../models/registration.model.ts';
import { User } from '../models/user.model.ts';

export interface UserGatewayInterface {
    registerUser(userInput: UserInput): Promise<User | null>;
}
