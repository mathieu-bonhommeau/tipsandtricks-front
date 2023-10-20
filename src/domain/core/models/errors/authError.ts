export class AuthError {
    public code: string = 'LOGIN_UNKNOWN_ERROR';
}

export class WrongCredentialsError extends AuthError {
    public code: string = 'WRONG_CREDENTIALS_ERROR';
    constructor() {
        super();
    }
}

export class LogoutError {
    public code: string = 'LOGOUT_UNKNOWN_ERROR';
}

export class ReconnectError {
    public code: string = 'RECONNECT_UNKNOWN_ERROR';
}

export class RefreshTokenError {
    public code: string = 'REFRESH_TOKEN_ERROR';
}
