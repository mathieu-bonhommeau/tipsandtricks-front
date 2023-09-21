import { describe, expect, test } from 'vitest';
import dependencyContainer from '../../../../_dependencyContainer/dependencyContainer.ts';
import { UserApiInMemory } from '../../../../server-side/user/user.apiInMemory.ts';
import { store } from '../../../store.ts';
import { registerUser } from '../user.actions.ts';

dependencyContainer.set<UserApiInMemory>('UserApiInMemory', () => {
    return new UserApiInMemory();
});

describe('When a user submits the register form', () => {
    test('His inputs are correct', async () => {
        const UserInputs = {
            username: 'Mathieu',
            email: 'mathieu@oclock.io',
            password: 'Test123456!#',
        };

        await store.dispatch(
            registerUser({
                userInterface: dependencyContainer.get<UserApiInMemory>('UserApiInMemory'),
                userInput: UserInputs,
            }),
        );

        expect(store.getState().user.registrationError).toEqual(null);
    });
});
