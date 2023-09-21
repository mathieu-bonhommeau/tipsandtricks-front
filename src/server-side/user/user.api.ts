import { UserInput, UserInterface } from '../../domain/user/port/user.interface.ts';

export class UserApi implements UserInterface {
    registerUser(userInputs: UserInput): Promise<string> {
        console.log(userInputs);
        return Promise.resolve('API response');
    }
}
