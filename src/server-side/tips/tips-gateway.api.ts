import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface';
import { Tips } from '../../domain/tips/models/tips.model';
import { AxiosError } from 'axios';
import { ApiError, UnauthorizedError } from '../../domain/core/models/errors/globalError.ts';
import axiosInstance from '../core/axios.instance.ts';
import { Error } from '@mui/icons-material';
import {PaginatedResponse} from "../../domain/core/models/paginatedResponse.ts";

export class TipsGatewayApi implements TipsGatewayInterface {
    async getTips(page: number, length: number): Promise<PaginatedResponse<Tips>> {
        try {
            const response = await axiosInstance({
                method: 'GET',
                url: `tips?page=${page}&length=${length}`,
            });

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) throw new UnauthorizedError();
                throw new ApiError('Failed to fetch tips from API');
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }

    async deleteTip(tipsId: number): Promise<void> {
        try {
            const response = await axiosInstance({
                method: 'DELETE',
                url: `tips/${tipsId}`,
            });

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) throw new UnauthorizedError();
                throw new ApiError('Failed to delete tips from API');
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }
}
