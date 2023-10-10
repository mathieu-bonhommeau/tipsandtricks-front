import { Roles, User } from '../../models/user.model.ts';
import { UserInput } from '../../models/registration.model.ts';

export default class RegistrationTestBuilder {
    private readonly _id: number | null = 1;
    private _email: string = 'email@email.com';
    private _username: string = 'usertest';
    private _password: string = '_qyU1)"v@2^9';
    private _confirmationPassword: string = '_qyU1)"v@2^9';
    private readonly _roles: Roles | null = null;
    private readonly _created_at: string = '2022-12-17T03:24:00';
    private readonly _updated_at: string | null = null;

    buildUser(): User {
        return {
            id: this._id,
            email: this._email,
            username: this._username,
            roles: this._roles,
            created_at: this._created_at,
            updated_at: this._updated_at,
        } as User;
    }

    buildInputUserData(): UserInput {
        return {
            email: this._email,
            username: this._username,
            password: this._password,
            confirmationPassword: this._confirmationPassword,
        } as UserInput;
    }

    withEmail(email: string): RegistrationTestBuilder {
        this._email = email;
        return this;
    }

    withUsername(username: string): RegistrationTestBuilder {
        this._username = username;
        return this;
    }

    withPassword(password: string): RegistrationTestBuilder {
        this._password = password;
        return this;
    }

    withConfirmationPassword(password: string): RegistrationTestBuilder {
        this._confirmationPassword = password;
        return this;
    }
}
