import { UserInput, UserInterface } from '../../domain/user/port/user.interface.ts';

export class UserApiInMemory implements UserInterface {
    registerUser(userInputs: UserInput): Promise<string> {
        console.log(userInputs);
        return Promise.resolve('Test');
    }
}
