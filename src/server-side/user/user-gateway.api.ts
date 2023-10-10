import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { APIErrorMessages, UserInput } from '../../domain/user/models/registration.model.ts';
import { User } from '../../domain/user/models/user.model.ts';
import axios, { AxiosError } from 'axios';

export class UserGatewayApi implements UserGatewayInterface {
    async registerUser(userInputs: UserInput): Promise<User | null> {
        try {
            const result = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_API_URL}/api/register`,
                data: {
                    email: userInputs.email,
                    username: userInputs.username,
                    password: userInputs.password,
                },
            });

            return result.data.data as User;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.data === 'This email already exists in database !')
                throw new Error(APIErrorMessages.EMAIL_ALREADY_USED);
            if (axiosError.response?.data === 'This username already exists in database !')
                throw new Error(APIErrorMessages.USERNAME_ALREADY_USED);
            throw new Error(APIErrorMessages.UNKNOWN_ERROR);
        }
    }
}
