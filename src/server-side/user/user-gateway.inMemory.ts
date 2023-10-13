import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { RegistrationUserInput } from '../../domain/user/models/registration.model.ts';
import { APIErrorMessages, User } from '../../domain/user/models/user.model.ts';
import { LoginUserInput } from '../../domain/user/models/authentication.model.ts';

export class UserGatewayInMemory implements UserGatewayInterface {
    private user: User | null = null;
    private usernameError: boolean = false;
    private emailError: boolean = false;
    private registerUnknownError: boolean = false;
    private credentialsError: boolean = false;
    private loginUnknownError: boolean = false;
    private logoutUnknownError: boolean = false;
    private unauthorizedError: boolean = false;

    async registerUser(userInputs: RegistrationUserInput): Promise<User | null> {
        userInputs; // Disable typescript no-used error
        if (!this.usernameError && !this.emailError && !this.registerUnknownError) {
            return this.user;
        } else {
            if (this.emailError) {
                throw new Error(APIErrorMessages.EMAIL_ALREADY_USED);
            } else if (this.usernameError) {
                throw new Error(APIErrorMessages.USERNAME_ALREADY_USED);
            } else if (this.registerUnknownError) {
                throw new Error(APIErrorMessages.REGISTER_UNKNOWN_ERROR);
            }
            return null;
        }
    }

    async loginUser(userInputs: LoginUserInput): Promise<User | null> {
        userInputs; // Disable typescript no-used error
        if (!this.credentialsError && !this.loginUnknownError) {
            return this.user;
        } else if (this.credentialsError) {
            throw new Error(APIErrorMessages.WRONG_CREDENTIALS);
        } else if (this.loginUnknownError) {
            throw new Error(APIErrorMessages.LOGIN_UNKNOWN_ERROR);
        }
        return null;
    }

    async logoutUser(): Promise<void> {
        if (!this.logoutUnknownError) {
            return;
        }
        throw new Error(APIErrorMessages.LOGOUT_UNKNOWN_ERROR);
    }

    async reconnectUser(): Promise<User | null> {
        if (!this.unauthorizedError) {
            return this.user;
        }
        throw new Error(APIErrorMessages.UNAUTHORIZED_ERROR);
    }

    refreshToken(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    setUser(user: User): void {
        this.user = user;
    }

    setUsernameAlreadyUsedError(value: boolean) {
        this.usernameError = value;
    }

    setEmailAlreadyUsedError(value: boolean) {
        this.emailError = value;
    }

    setRegisterUnknownError(value: boolean) {
        this.registerUnknownError = value;
    }

    setCredentialsError(value: boolean) {
        this.credentialsError = value;
    }

    setLoginUnknownError(value: boolean) {
        this.loginUnknownError = value;
    }

    setLogoutUnknownError(value: boolean) {
        this.logoutUnknownError = value;
    }

    setUnauthorizedError(value: boolean) {
        this.unauthorizedError = value;
    }
}
