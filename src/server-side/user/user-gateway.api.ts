import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { RegistrationUserInput } from '../../domain/user/models/registration.model.ts';
import { User } from '../../domain/user/models/user.model.ts';
import { AxiosError } from 'axios';
import {
    AuthError,
    LogoutError,
    ReconnectError,
    RefreshTokenError,
    WrongCredentialsError,
} from '../../domain/core/models/errors/authError.ts';
import { LoginUserInput } from '../../domain/user/models/authentication.model.ts';
import RegisterError, {
    EmailAlreadyUsedError,
    UsernameAlreadyUsedError,
} from '../../domain/core/models/errors/registerError.ts';
import { UnauthorizedError } from '../../domain/core/models/errors/globalError.ts';
import axiosInstance from '../core/axios.instance.ts';

export class UserGatewayApi implements UserGatewayInterface {
    async registerUser(userInputs: RegistrationUserInput): Promise<User> {
        try {
            const result = await axiosInstance({
                method: 'POST',
                url: `register`,
                data: {
                    email: userInputs.email,
                    username: userInputs.username,
                    password: userInputs.password,
                },
            });

            return result.data.data as User;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                if (errorData?.code === 'EMAIL_ALREADY_EXIST_ERROR') throw new EmailAlreadyUsedError();
                if (errorData?.code === 'USERNAME_ALREADY_EXIST_ERROR') throw new UsernameAlreadyUsedError();
                throw new RegisterError();
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }

    async loginUser(userInputs: LoginUserInput): Promise<User> {
        try {
            const result = await axiosInstance({
                method: 'POST',
                url: `login`,
                data: {
                    email: userInputs.email,
                    password: userInputs.password,
                },
            });

            return result.data.data as User;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                if (errorData.status === 400) throw new WrongCredentialsError();
                throw new AuthError();
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }

    async logoutUser(): Promise<void> {
        try {
            await axiosInstance({
                method: 'POST',
                url: `logout`,
            });
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    throw new UnauthorizedError();
                }
                throw new LogoutError();
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }

    async reconnectUser(): Promise<User | null> {
        try {
            const result = await axiosInstance({
                method: 'GET',
                url: `reconnect`,
            });
            return result.data.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                throw new ReconnectError();
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }

    async refreshToken(): Promise<User | null> {
        try {
            const result = await axiosInstance({
                method: 'GET',
                url: `refresh-token`,
            });
            return result.data.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    throw new UnauthorizedError();
                }
                throw new RefreshTokenError();
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }
}
