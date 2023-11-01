import { AxiosError } from 'axios';
import { ApiError, UnauthorizedError } from '../../domain/core/models/errors/globalError.ts';
import { PostGatewayInterface } from '../../domain/posts/port/post-gateway-interface.ts';
import { InfiniteResponse } from '../../domain/core/models/infiniteResponse.ts';
import { Post } from '../../domain/posts/models/post.model.ts';
import axiosInstance from '../core/axios.instance.ts';
import { Tips } from '../../domain/tips/models/tips.model.ts';

export class PostGatewayApi implements PostGatewayInterface {
    async getPosts(start: number, length: number): Promise<InfiniteResponse<Post>> {
        try {
            const response = await axiosInstance({
                method: 'GET',
                url: `posts?start=${start}&length=${length}`,
            });

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) throw new UnauthorizedError();
                throw new ApiError('Failed to fetch posts from API');
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }

    async saveTips(post: Post): Promise<Tips> {
        try {
            const response = await axiosInstance({
                method: 'POST',
                url: `tips`,
                data: {
                    title: post.title,
                    command: post.command,
                    description: post.description,
                    user_id: post.user_id,
                },
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) throw new UnauthorizedError();
                throw new ApiError('Failed to fetch posts from API');
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }
}
