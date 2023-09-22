import { beforeEach, describe, expect, test } from 'vitest';
import { UserGatewayInMemory } from '../../../../server-side/user/user-gateway.inMemory.ts';
import RegistrationTestBuilder from './registrationTestBuilder.ts';
import { UserInput } from '../../models/registration.model.ts';
import { User } from '../../models/user.model.ts';
import { store } from '../../../store.ts';
import { registerUser } from '../registration.actions.ts';

describe('When a user submits the register form', () => {
    let sut: SUT;
    let userGatewayInMemory: UserGatewayInMemory;

    beforeEach(() => {
        sut = new SUT();
        userGatewayInMemory = new UserGatewayInMemory();
    });

    test('user inputs are correct', async () => {
        const userInputs = sut.givenAUserInput();
        const expectedUser = sut.givenAUser();

        await store.dispatch(registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs }));

        expect(store.getState().registration.passwordValidity).toEqual(true);
        expect(store.getState().registration.passwordsEquality).toEqual(true);
        expect(store.getState().registration.user).toEqual(expectedUser);
    });

    /*        test('return an error if password is not strong enough', () => {
        const userInputs = sut.givenAUserInputWithTooWeakPassword();
        store.dispatch(validatePasswordStrength(userInputs.password));
        expect(store.getState().registration.strengthPassword).toBe(false);
    });

    test('return an error if password and confirmation password are not the same', () => {
        const userInputs = sut.givenAUserInputWithBadConfirmPassword();
        store.dispatch(validateRegisterInputs(userInputs));
        expect(store.getState().registration.registrationError.length).toEqual(1);
    });*/
});

class SUT {
    private _registrationTestBuilder: RegistrationTestBuilder;
    constructor() {
        this._registrationTestBuilder = new RegistrationTestBuilder();
    }
    givenAUserInput(): UserInput {
        return this._registrationTestBuilder.buildInputUserData();
    }

    givenAUser(): User {
        return this._registrationTestBuilder.buildUser();
    }

    givenAUserInputWithTooWeakPassword(): UserInput {
        this._registrationTestBuilder.withPassword('test');
        return this._registrationTestBuilder.buildInputUserData();
    }

    givenAUserInputWithBadConfirmPassword(): UserInput {
        this._registrationTestBuilder.withConfirmationPassword('notthesame');
        return this._registrationTestBuilder.buildInputUserData();
    }
}
