import { beforeEach, describe, expect, Mock, test } from 'vitest';
import { UserGatewayInMemory } from '../../../../server-side/user/user-gateway.inMemory.ts';
import TestBuilder from './testBuilder.ts';
import { RegistrationUserInput } from '../../models/registration.model.ts';
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
import { resetEmailAlreadyUsedError, resetUsernameAlreadyUsedError } from '../registration.slice.ts';
import { vi } from 'vitest';

let store: ToolkitStore;
let sut: SUT;
let userGatewayInMemory: UserGatewayInMemory;
let mockNavigate: Mock;

beforeEach(() => {
    store = setupStore();
    sut = new SUT();
    userGatewayInMemory = new UserGatewayInMemory();
    userGatewayInMemory.setUser(sut.givenAUser());
    userGatewayInMemory.setUsernameAlreadyUsedError(false);
    userGatewayInMemory.setEmailAlreadyUsedError(false);
    userGatewayInMemory.setRegisterUnknownError(false);
    mockNavigate = vi.fn();
});

describe('When a user submits the register form', () => {
    test('when user inputs are correct, there are no error messages and the created user is into the store', async () => {
        const userInputs = sut.givenAUserInput();
        const expectedUser = sut.givenAUser();

        await store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );

        expect(store.getState().registration.usernameValidity).toEqual(true);
        expect(store.getState().registration.passwordValidity).toEqual(true);
        expect(store.getState().registration.passwordsEquality).toEqual(true);
        expect(store.getState().registration.user).toEqual(expectedUser);
    });

    test('when the password is not valid, there is a corresponding error and the API gateway is not called', () => {
        const userInputs = sut.givenAUserInputWithTooWeakPassword();

        store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );
        expect(store.getState().registration.passwordValidity).toBe(false);
        expect(store.getState().registration.user).toEqual(null);
    });

    test('when the two passwords are not the same, there is a corresponding error and the API gateway is not called', () => {
        const userInputs = sut.givenAUserInputWithBadConfirmPassword();

        store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );
        expect(store.getState().registration.passwordsEquality).toBe(false);
        expect(store.getState().registration.user).toEqual(null);
    });

    test('when the userName is too short, there is a corresponding error and the API gateway is not called', () => {
        const userInputs = sut.givenAUserInputWithBadUserName();

        store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );
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

describe('When the registration form is submitted', () => {
    test('if the response from API is a success, the user is redirected on the connexion page', async () => {
        const userInputs = sut.givenAUserInput();

        await store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );

        expect(mockNavigate).toHaveBeenCalledWith('/connexion');
    });

    test('if the response from API says the username is already used, there is a corresponding error', async () => {
        const userInputs = sut.givenAUserInput();
        userGatewayInMemory.setUsernameAlreadyUsedError(true);

        await store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );

        expect(store.getState().registration.emailAlreadyUsedError).toEqual(false);
        expect(store.getState().registration.usernameAlreadyUsedError).toEqual(true);
        expect(mockNavigate).not.toBeCalled();
    });

    test('if the username is changed the error message should vanish', async () => {
        // Set the error state
        const userInputs = sut.givenAUserInput();
        userGatewayInMemory.setUsernameAlreadyUsedError(true);
        await store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );
        expect(store.getState().registration.usernameAlreadyUsedError).toEqual(true);

        // The error should be removed
        store.dispatch(resetUsernameAlreadyUsedError());
        expect(store.getState().registration.usernameAlreadyUsedError).toEqual(false);
    });

    test('if the response from API says the email address is already used, there is a corresponding error', async () => {
        const userInputs = sut.givenAUserInput();
        userGatewayInMemory.setEmailAlreadyUsedError(true);

        await store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );

        expect(store.getState().registration.usernameAlreadyUsedError).toEqual(false);
        expect(store.getState().registration.emailAlreadyUsedError).toEqual(true);
        expect(mockNavigate).not.toBeCalled();
    });

    test('if the email is changed the error message should vanish', async () => {
        // Set the error state
        const userInputs = sut.givenAUserInput();
        userGatewayInMemory.setEmailAlreadyUsedError(true);
        await store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );
        expect(store.getState().registration.emailAlreadyUsedError).toEqual(true);

        // The error should be removed
        store.dispatch(resetEmailAlreadyUsedError());
        expect(store.getState().registration.emailAlreadyUsedError).toEqual(false);
    });

    test('if the response from API says unknown error, there is a corresponding error', async () => {
        const userInputs = sut.givenAUserInput();
        userGatewayInMemory.setRegisterUnknownError(true);

        await store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );

        expect(store.getState().registration.usernameAlreadyUsedError).toEqual(false);
        expect(store.getState().registration.emailAlreadyUsedError).toEqual(false);
        expect(store.getState().registration.unknownServerError).toEqual(true);
        expect(mockNavigate).not.toBeCalled();
    });

    test('if the form is submitted the error message should vanish', async () => {
        // Set the error state
        const userInputs = sut.givenAUserInput();
        userGatewayInMemory.setRegisterUnknownError(true);
        await store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );
        expect(store.getState().registration.unknownServerError).toEqual(true);

        // The error should be removed
        userGatewayInMemory.setRegisterUnknownError(false);
        await store.dispatch(
            registerUser({ userGatewayInterface: userGatewayInMemory, userInput: userInputs, navigate: mockNavigate }),
        );
        expect(store.getState().registration.unknownServerError).toEqual(false);
    });
});

class SUT {
    private _registrationTestBuilder: TestBuilder;
    constructor() {
        this._registrationTestBuilder = new TestBuilder();
    }
    givenAUserInput(): RegistrationUserInput {
        return this._registrationTestBuilder.buildRegistrationUserInput();
    }

    givenAUser(): User {
        return this._registrationTestBuilder.buildUser();
    }

    givenAUserInputWithBadUserName(): RegistrationUserInput {
        this._registrationTestBuilder.withUsername('A');
        return this._registrationTestBuilder.buildRegistrationUserInput();
    }

    givenAUserInputWithCorrectUserName(): RegistrationUserInput {
        this._registrationTestBuilder.withUsername('AB');
        return this._registrationTestBuilder.buildRegistrationUserInput();
    }

    givenAUserInputWithTooWeakPassword(): RegistrationUserInput {
        this._registrationTestBuilder.withPassword('test');
        return this._registrationTestBuilder.buildRegistrationUserInput();
    }

    givenAUserInputWithStrongPassword(): RegistrationUserInput {
        this._registrationTestBuilder.withPassword('123blablaBlop#');
        return this._registrationTestBuilder.buildRegistrationUserInput();
    }

    givenAUserInputWithBadConfirmPassword(): RegistrationUserInput {
        this._registrationTestBuilder.withConfirmationPassword('notthesame');
        return this._registrationTestBuilder.buildRegistrationUserInput();
    }

    givenAUserInputWithCorrectConfirmPassword(): RegistrationUserInput {
        this._registrationTestBuilder.withConfirmationPassword(this.givenAUserInput().password);
        return this._registrationTestBuilder.buildRegistrationUserInput();
    }
}
