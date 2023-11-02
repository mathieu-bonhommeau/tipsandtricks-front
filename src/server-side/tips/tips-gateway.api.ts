import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface';
import { Tips, TipsInput } from '../../domain/tips/models/tips.model';
import { AxiosError } from 'axios';
import { ApiError, UnauthorizedError } from '../../domain/core/models/errors/globalError.ts';
import axiosInstance from '../core/axios.instance.ts';
import { PaginatedResponse } from '../../domain/core/models/paginatedResponse.ts';
import { InputCreatePost, Post } from '../../domain/posts/models/post.model.ts';

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

    async deleteTip(tipsId: number): Promise<number> {
        try {
            await axiosInstance({
                method: 'DELETE',
                url: `tips/${tipsId}`,
            });

            return tipsId;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) throw new UnauthorizedError();
                throw new ApiError('Failed to delete tips from API');
            }

            throw new Error('UNKNOWN_ERROR');
        }
    }

    async shareTips(tipsToShare: InputCreatePost): Promise<Post> {
        try {
            const response = await axiosInstance({
                method: 'POST',
                url: `post`,
                data: tipsToShare,
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

    async createTips(tips: TipsInput): Promise<Tips> {
        try {
            const response = await axiosInstance({
                method: 'POST',
                url: `tips`,
                data: tips,
            });

            return response.data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) throw new UnauthorizedError();
                throw new ApiError('Create tips failed !');
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }

    async updateTips(tips: Tips): Promise<Tips> {
        try {
            const response = await axiosInstance({
                method: 'PUT',
                url: `tips/${tips.id}`,
                data: tips,
            });

            return response.data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) throw new UnauthorizedError();
                throw new ApiError('Update tips failed !');
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }
}
