import { Tips } from '../models/tips.model';

export interface PaginatedResponse<T> {
    page: number;
    lengthPerPage: number;
    total: number;
    data: T[];
}

export interface TipsGatewayInterface {
    getTips(page: number, length: number): Promise<PaginatedResponse<Tips>>;
}
