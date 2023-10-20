import { Tips } from '../models/tips.model';
import GatewayInterface from '../../core/port/gatewayInterface.ts';

export interface PaginatedResponse<T> {
    page: number;
    lengthPerPage: number;
    total: number;
    data: T[];
}

export interface TipsGatewayInterface extends GatewayInterface {
    getTips(page: number, length: number): Promise<PaginatedResponse<Tips>>;
}
