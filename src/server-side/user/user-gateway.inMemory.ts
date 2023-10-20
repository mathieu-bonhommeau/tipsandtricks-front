import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { User } from '../../domain/user/models/user.model.ts';
import { AuthError, LogoutError, WrongCredentialsError } from '../../domain/core/models/errors/authError.ts';
import RegisterError, {
    EmailAlreadyUsedError,
    UsernameAlreadyUsedError,
} from '../../domain/core/models/errors/registerError.ts';
import { UnauthorizedError } from '../../domain/core/models/errors/globalError.ts';

export class UserGatewayInMemory implements UserGatewayInterface {
    private user: User | null = null;
    private usernameError: boolean = false;
    private emailError: boolean = false;
    private registerUnknownError: boolean = false;
    private credentialsError: boolean = false;
    private loginUnknownError: boolean = false;
    private logoutUnknownError: boolean = false;
    private unauthorizedError: boolean = false;

    async registerUser(): Promise<User | null> {
        if (!this.usernameError && !this.emailError && !this.registerUnknownError) {
            return this.user;
        } else {
            if (this.emailError) {
                throw new EmailAlreadyUsedError();
            } else if (this.usernameError) {
                throw new UsernameAlreadyUsedError();
            } else if (this.registerUnknownError) {
                throw new RegisterError();
            }
            return null;
        }
    }

    async loginUser(): Promise<User | null> {
        if (!this.credentialsError && !this.loginUnknownError) {
            return this.user;
        } else if (this.credentialsError) {
            throw new WrongCredentialsError();
        } else if (this.loginUnknownError) {
            throw new AuthError();
        }
        return null;
    }

    async logoutUser(): Promise<void> {
        if (!this.logoutUnknownError) {
            return;
        }
        throw new LogoutError();
    }

    async reconnectUser(): Promise<User | null> {
        if (!this.unauthorizedError) {
            return this.user;
        }
        throw new UnauthorizedError();
    }

    async refreshToken(): Promise<User | null> {
        if (!this.unauthorizedError) {
            return this.user;
        }
        throw new UnauthorizedError();
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
