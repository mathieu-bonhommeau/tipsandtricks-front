export class UnauthorizedError {
    public code: string = 'UNAUTHORIZED_ERROR';
}

export class ApiError {
    public code: string = 'API_ERROR';

    constructor(public message: string) {}
}
