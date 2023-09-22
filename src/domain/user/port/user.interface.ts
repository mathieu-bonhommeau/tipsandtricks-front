export type UserInput = {
    username: string;
    email: string;
    password: string;
    confirmationPassword: string;
};
export interface UserInterface {
    registerUser(userInput: UserInput): Promise<string>;
}
