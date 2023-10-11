import { Mock, vi, expect, beforeEach, describe, test } from 'vitest';
import TestBuilder from './testBuilder.ts';
import { User } from '../../models/user.model.ts';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { setupStore } from '../../../store.ts';
import { LoginUserInput } from '../../models/login.model.ts';
import { UserGatewayInMemory } from '../../../../server-side/user/user-gateway.inMemory.ts';
import { loginUser } from '../login.actions.ts';
import { resetErrorState } from '../login.slice.ts';

let store: ToolkitStore;
let sut: SUT;
let userGatewayInMemory: UserGatewayInMemory;
let mockNavigate: Mock;

beforeEach(() => {
    store = setupStore();
    sut = new SUT();
    userGatewayInMemory = new UserGatewayInMemory();
    userGatewayInMemory.setUser(sut.givenAUser());
    userGatewayInMemory.setCredentialsError(false);
    mockNavigate = vi.fn();
});

describe('When a user submits the register form', () => {
    test('when user inputs are correct, there are no error messages, the user is retreived and there is a redirection', async () => {
        const userInput = sut.givenAUserInput();
        const expectedUser = sut.givenAUser();

        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        expect(store.getState().login.credentialsError).toEqual(false);
        expect(store.getState().login.unknownError).toEqual(false);
        expect(store.getState().login.user).toEqual(expectedUser);

        expect(mockNavigate).toHaveBeenCalledWith('/mes-tips');
    });

    test('when there is a credentials error, there is a corresponding error message and there is no redirect', async () => {
        const userInput = sut.givenAUserInput();
        userGatewayInMemory.setCredentialsError(true);

        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        expect(store.getState().login.credentialsError).toEqual(true);
        expect(mockNavigate).not.toBeCalled();
    });

    test('when there is a server error, there is a corresponding error message and there is no redirect', async () => {
        const userInput = sut.givenAUserInput();
        userGatewayInMemory.setLoginUnknownError(true);

        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        expect(store.getState().login.unknownError).toEqual(true);
        expect(mockNavigate).not.toBeCalled();
    });
    test('if the form was submitted and an error arised, it is removed when the reset error event is called', async () => {
        const userInput = sut.givenAUserInput();
        userGatewayInMemory.setLoginUnknownError(true);

        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        store.dispatch(resetErrorState());

        expect(store.getState().login.credentialsError).toEqual(false);
        expect(store.getState().login.unknownError).toEqual(false);
    });
});

class SUT {
    private _registrationTestBuilder: TestBuilder;

    constructor() {
        this._registrationTestBuilder = new TestBuilder();
    }

    givenAUserInput(): LoginUserInput {
        return this._registrationTestBuilder.buildLoginUserInput();
    }

    givenAUser(): User {
        return this._registrationTestBuilder.buildUser();
    }
}
