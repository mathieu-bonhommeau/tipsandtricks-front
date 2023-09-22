import { beforeEach, describe, expect, test } from 'vitest';
import { UserGatewayInMemory } from '../../../../server-side/user/user-gateway.inMemory.ts';
import RegistrationTestBuilder from './registrationTestBuilder.ts';
import { UserInput } from '../../models/registration.model.ts';
import { User } from '../../models/user.model.ts';
import { setupStore } from '../../../store.ts';
import { registerUser } from '../registration.actions.ts';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
// Empty type-import to clue TS into redux toolkit action type
import type {} from 'redux-thunk/extend-redux';

describe('When a user submits the register form', () => {
    let store: ToolkitStore;
    let sut: SUT;
    let userGatewayInMemory: UserGatewayInMemory;

    beforeEach(() => {
        store = setupStore();
        sut = new SUT();
        userGatewayInMemory = new UserGatewayInMemory();
        userGatewayInMemory.setUser(sut.givenAUser());
    });

    test('when user inputs are correct, there are no error messages and the created user is into the store', async () => {
        const userInputs = sut.givenAUserInput();
        const expectedUser = sut.givenAUser();

        await store.dispatch(registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs }));

        expect(store.getState().registration.passwordValidity).toEqual(true);
        expect(store.getState().registration.passwordsEquality).toEqual(true);
        expect(store.getState().registration.user).toEqual(expectedUser);
    });

    test('when the password is not valid, there is a corresponding error an the API gateway is not called', () => {
        const userInputs = sut.givenAUserInputWithTooWeakPassword();

        store.dispatch(registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs }));
        expect(store.getState().registration.passwordValidity).toBe(false);
        expect(store.getState().registration.user).toEqual(null);
    });

    test('when the two passwords are not the same, there is a corresponding error an the API gateway is not called', () => {
        const userInputs = sut.givenAUserInputWithBadConfirmPassword();

        store.dispatch(registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs }));
        expect(store.getState().registration.passwordsEquality).toBe(false);
        expect(store.getState().registration.user).toEqual(null);
    });
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
