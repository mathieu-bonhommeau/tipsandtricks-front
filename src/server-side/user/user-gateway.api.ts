import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { APIErrorMessages, UserInput } from '../../domain/user/models/registration.model.ts';
import { User } from '../../domain/user/models/user.model.ts';
import axios, { AxiosError } from 'axios';

export class UserGatewayApi implements UserGatewayInterface {
    async registerUser(userInputs: UserInput): Promise<User | null> {
        try {
            const result = await axios({
                method: 'POST',
                url: 'http://localhost:5000/api/register',
                data: {
                    email: userInputs.email,
                    username: userInputs.username,
                    password: userInputs.password,
                },
            });

            return result.data.data as User;

            // @ts-ignore
        } catch (error: AxiosError) {
            console.log('error :', error);
            if (error.response.data === 'This email already exists in database !')
                throw new Error(APIErrorMessages.EMAIL_ALREADY_USED);
            if (error.response.data === 'This username already exists in database !')
                throw new Error(APIErrorMessages.USERNAME_ALREADY_USED);
            throw new Error(APIErrorMessages.UNKNOWN_ERROR);
        }
    }
}
