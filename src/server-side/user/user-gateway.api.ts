import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { UserInput } from '../../domain/user/models/registration.model.ts';
import { User } from '../../domain/user/models/user.model.ts';

export class UserGatewayApi implements UserGatewayInterface {
    async registerUser(userInputs: UserInput): Promise<User | null> {
        return {
            id: 1,
            email: userInputs.email,
            username: userInputs.username,
            roles: null,
            created_at: new Date('2022-12-17T03:24:00').toDateString(),
            updated_at: null,
        } as User;
    }
}
