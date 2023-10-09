import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { APIErrorMessages, UserInput } from '../../domain/user/models/registration.model.ts';
import { User } from '../../domain/user/models/user.model.ts';
import axios from 'axios';

export class UserGatewayApi implements UserGatewayInterface {
    async registerUser(userInputs: UserInput): Promise<User | null> {
        const result = axios({
            method: 'POST',
            url: 'http://localhost:5000/api/register',
            data: {
                email: 'test@email.eu',
                username: 'Flintstone',
                password: 'Test123456789!',
            },
        });

        console.log(result);

        // throw new Error(APIErrorMessages.USERNAME_ALREADY_USED);

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
