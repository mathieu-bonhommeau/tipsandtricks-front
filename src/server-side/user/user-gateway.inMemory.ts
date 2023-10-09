import { UserGatewayInterface } from '../../domain/user/port/user-gateway.interface.ts';
import { APIErrorMessages, UserInput } from '../../domain/user/models/registration.model.ts';
import { User } from '../../domain/user/models/user.model.ts';

export class UserGatewayInMemory implements UserGatewayInterface {
    private user: User | null = null;
    private usernameError: boolean = false;
    private emailError: boolean = false;
    private unknownError: boolean = false;

    async registerUser(userInputs: UserInput): Promise<User | null> {
        console.log(userInputs);
        if (!this.usernameError && !this.emailError && !this.unknownError) {
            return this.user;
        } else {
            if (this.usernameError) {
                throw new Error(APIErrorMessages.USERNAME_ALREADY_USED);
            } else if (this.emailError) {
                throw new Error(APIErrorMessages.EMAIL_ALREADY_USED);
            } else if (this.unknownError) {
                throw new Error(APIErrorMessages.UNKNOWN_ERROR);
            }
            return null;
        }
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

    setUnknownError(value: boolean) {
        this.unknownError = value;
    }
}
