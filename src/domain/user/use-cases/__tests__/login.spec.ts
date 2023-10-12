import { Mock, vi, expect, beforeEach, describe, test } from 'vitest';
import TestBuilder from './testBuilder.ts';
import { User } from '../../models/user.model.ts';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { setupStore } from '../../../store.ts';
import { LoginUserInput } from '../../models/authentication.model.ts';
import { UserGatewayInMemory } from '../../../../server-side/user/user-gateway.inMemory.ts';
import { loginUser, logoutUser } from '../authentication.actions.ts';
import { resetErrorState } from '../authentication.slice.ts';

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

describe('Login: when a user submits the register form', () => {
    test('when user inputs are correct, there are no error messages, the user is retreived and there is a redirection', async () => {
        const userInput = sut.givenAUserInput();
        const expectedUser = sut.givenAUser();

        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        expect(store.getState().authentication.credentialsError).toEqual(false);
        expect(store.getState().authentication.unknownServerLoginError).toEqual(false);
        expect(store.getState().authentication.user).toEqual(expectedUser);

        expect(mockNavigate).toHaveBeenCalledWith('/flux');
    });

    test('when there is a credentials error, there is a corresponding error message and there is no redirect', async () => {
        const userInput = sut.givenAUserInput();
        userGatewayInMemory.setCredentialsError(true);

        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        expect(store.getState().authentication.credentialsError).toEqual(true);
        expect(mockNavigate).not.toBeCalled();
    });

    test('when there is a server error, there is a corresponding error message and there is no redirect', async () => {
        const userInput = sut.givenAUserInput();
        userGatewayInMemory.setLoginUnknownError(true);

        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        expect(store.getState().authentication.unknownServerLoginError).toEqual(true);
        expect(mockNavigate).not.toBeCalled();
    });
    test('if the form was submitted and an error arised, it is removed when the reset error event is called', async () => {
        const userInput = sut.givenAUserInput();
        userGatewayInMemory.setLoginUnknownError(true);

        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        store.dispatch(resetErrorState());

        expect(store.getState().authentication.credentialsError).toEqual(false);
        expect(store.getState().authentication.unknownServerLoginError).toEqual(false);
    });
});

describe('Logout : when a connected user wants to disconnect', () => {
    test('if the API request succeeds, his data are removed from the state and he is redirected toward homepage', async () => {
        const userInput = sut.givenAUserInput();
        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        await store.dispatch(logoutUser({ userGatewayInterface: userGatewayInMemory, navigate: mockNavigate }));

        expect(store.getState().authentication.user).toEqual(null);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('if the API request fails, his data are not lost and he is not redirected toward homepage', async () => {
        const userInput = sut.givenAUserInput();
        const expectedUser = sut.givenAUser();

        await store.dispatch(
            loginUser({ userGatewayInterface: userGatewayInMemory, userInput: userInput, navigate: mockNavigate }),
        );

        userGatewayInMemory.setLogoutUnknownError(true);

        await store.dispatch(logoutUser({ userGatewayInterface: userGatewayInMemory, navigate: mockNavigate }));

        expect(store.getState().authentication.user).toEqual(expectedUser);
        expect(mockNavigate).not.toHaveBeenCalledWith('/');
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
