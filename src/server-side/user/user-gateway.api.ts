import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { RegistrationUserInput } from '../../domain/user/models/registration.model.ts';
import { APIErrorMessages, User } from '../../domain/user/models/user.model.ts';
import axios, { AxiosError } from 'axios';
import { AxiosErrorData } from '../../domain/core/models/axios.model.ts';

export class UserGatewayApi implements UserGatewayInterface {
    async registerUser(userInputs: RegistrationUserInput): Promise<User> {
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
            const axiosErrorData = axiosError.response?.data as AxiosErrorData;
            if (axiosErrorData.message === 'This email already exists in database !')
                throw new Error(APIErrorMessages.EMAIL_ALREADY_USED);
            if (axiosErrorData.message === 'This username already exists in database !')
                throw new Error(APIErrorMessages.USERNAME_ALREADY_USED);
            throw new Error(APIErrorMessages.REGISTER_UNKNOWN_ERROR);
        }
    }

    async loginUser(userInputs: RegistrationUserInput): Promise<User> {
        try {
            const result = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_API_URL}/api/login`,
                data: {
                    email: userInputs.email,
                    password: userInputs.password,
                },
            });

            return result.data.data as User;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            const axiosErrorData = axiosError.response?.data as AxiosErrorData;
            if (axiosErrorData.status === 400) throw new Error(APIErrorMessages.WRONG_CREDENTIALS);
            throw new Error(APIErrorMessages.REGISTER_UNKNOWN_ERROR);
        }
    }

    async logoutUser(): Promise<void> {
        try {
            await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_API_URL}/api/logout`,
            });
        } catch {
            throw new Error(APIErrorMessages.LOGOUT_UNKNOWN_ERROR);
        }
    }

    async reconnectUser(): Promise<User | null> {
        console.log('reconnectUser');
        try {
            const result = await axios({
                method: 'GET',
                url: `${import.meta.env.VITE_API_URL}/api/reconnect`,
                withCredentials: true,
            });
            // console.log('reconnectUser result :', result);
            return result;
        } catch (error: unknown) {
            throw new Error(APIErrorMessages.RECONNECT_UNKNOWN_ERROR);
        }
    }
}
