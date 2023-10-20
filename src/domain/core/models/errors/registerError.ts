export default class RegisterError {
    public code: string = 'REGISTER_UNKNOWN_ERROR';
}

export class EmailAlreadyUsedError extends RegisterError {
    public code: string = 'EMAIL_ALREADY_USED';
}

export class UsernameAlreadyUsedError extends RegisterError {
    public code: string = 'USERNAME_ALREADY_USED';
}
