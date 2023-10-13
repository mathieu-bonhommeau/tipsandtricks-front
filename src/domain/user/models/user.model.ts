export enum Roles {
    admin = 'admin',
    moderator = 'moderator',
}
export type User = {
    id: number | null;
    email: string;
    username: string;
    roles: Roles | null;
    created_at: string;
    updated_at: string | null;
};

export enum APIErrorMessages {
    USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
    EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED',
    REGISTER_UNKNOWN_ERROR = 'REGISTER_UNKNOWN_ERROR',
    WRONG_CREDENTIALS = 'WRONG_CREDENTIALS',
    LOGIN_UNKNOWN_ERROR = 'LOGIN_UNKNOWN_ERROR',
    LOGOUT_UNKNOWN_ERROR = 'LOGOUT_UNKNOWN_ERROR',
    UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR',
    RECONNECT_UNKNOWN_ERROR = 'RECONNECT_UNKNOWN_ERROR',
}
