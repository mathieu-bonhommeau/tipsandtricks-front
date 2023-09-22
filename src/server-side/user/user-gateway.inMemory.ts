import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { UserInput } from '../../domain/user/models/registration.model.ts';
import { User } from '../../domain/user/models/user.model.ts';

export class UserGatewayInMemory implements UserGatewayInterface {
    private user: User | null = null;

    async registerUser(userInputs: UserInput): Promise<User | null> {
        console.log(userInputs);
        return this.user;
    }

    setUser(user: User): void {
        this.user = user;
    }
}
