import { beforeEach, describe, expect, test } from 'vitest';
import { UserGatewayInMemory } from '../../../../server-side/user/user-gateway.inMemory.ts';
import RegistrationTestBuilder from './registrationTestBuilder.ts';
import { UserInput } from '../../models/registration.model.ts';
import { User } from '../../models/user.model.ts';
import { setupStore } from '../../../store.ts';
import {
    checkConfirmationPassword,
    checkPasswordValidity,
    checkUsernameValidity,
    registerUser,
} from '../registration.actions.ts';
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

        expect(store.getState().registration.usernameValidity).toEqual(true);
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

    test('when the userName is too short, there is a corresponding error an the API gateway is not called', () => {
        const userInputs = sut.givenAUserInputWithBadUserName();

        store.dispatch(registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs }));
        expect(store.getState().registration.usernameValidity).toBe(false);
        expect(store.getState().registration.user).toEqual(null);
    });

    test('when user password is first invalid but corrected, the error message should vanish', async () => {
        const userInputsWithWeakPassword = sut.givenAUserInputWithTooWeakPassword();
        store.dispatch(checkPasswordValidity(userInputsWithWeakPassword.password));
        const userInputsWithStrongPassword = sut.givenAUserInputWithStrongPassword();
        store.dispatch(checkPasswordValidity(userInputsWithStrongPassword.password));

        expect(store.getState().registration.passwordValidity).toEqual(true);
    });

    test('when user confirmation password is first not the same but corrected, the error message should vanish', async () => {
        const userInputWithBadConfirmPassword = sut.givenAUserInputWithBadConfirmPassword();
        store.dispatch(
            checkConfirmationPassword(
                userInputWithBadConfirmPassword.password,
                userInputWithBadConfirmPassword.confirmationPassword,
            ),
        );
        const userInputWithCorrectConfirmPassword = sut.givenAUserInputWithCorrectConfirmPassword();
        store.dispatch(
            checkConfirmationPassword(
                userInputWithCorrectConfirmPassword.password,
                userInputWithCorrectConfirmPassword.confirmationPassword,
            ),
        );

        expect(store.getState().registration.passwordValidity).toEqual(true);
    });

    test('when username is shorter than 2 characters, there should be a corresponding error message', async () => {
        const userInputWithBadUserName = sut.givenAUserInputWithBadUserName();
        store.dispatch(checkUsernameValidity(userInputWithBadUserName.username));

        expect(store.getState().registration.usernameValidity).toEqual(false);
    });

    test('when username is first shorter than 2 characters but corrected, the error message should vanish', async () => {
        const userInputWithBadUserName = sut.givenAUserInputWithBadUserName();
        store.dispatch(checkUsernameValidity(userInputWithBadUserName.username));
        const userInputWithCorrectUserName = sut.givenAUserInputWithCorrectUserName();
        store.dispatch(checkUsernameValidity(userInputWithCorrectUserName.username));

        expect(store.getState().registration.usernameValidity).toEqual(true);
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

    givenAUserInputWithBadUserName(): UserInput {
        this._registrationTestBuilder.withUsername('A');
        return this._registrationTestBuilder.buildInputUserData();
    }

    givenAUserInputWithCorrectUserName(): UserInput {
        this._registrationTestBuilder.withUsername('AB');
        return this._registrationTestBuilder.buildInputUserData();
    }

    givenAUserInputWithTooWeakPassword(): UserInput {
        this._registrationTestBuilder.withPassword('test');
        return this._registrationTestBuilder.buildInputUserData();
    }

    givenAUserInputWithStrongPassword(): UserInput {
        this._registrationTestBuilder.withPassword('123blablaBlop#');
        return this._registrationTestBuilder.buildInputUserData();
    }

    givenAUserInputWithBadConfirmPassword(): UserInput {
        this._registrationTestBuilder.withConfirmationPassword('notthesame');
        return this._registrationTestBuilder.buildInputUserData();
    }

    givenAUserInputWithCorrectConfirmPassword(): UserInput {
        this._registrationTestBuilder.withConfirmationPassword(this.givenAUserInput().password);
        return this._registrationTestBuilder.buildInputUserData();
    }
}
