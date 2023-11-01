import ReactionGatewayInterface from '../../domain/reactions/port/reaction-gateway-interface.ts';
import { ReactionType, UserReactionWithLikesDislikes } from '../../domain/reactions/models/reaction.ts';
import axiosInstance from '../core/axios.instance.ts';
import { AxiosError } from 'axios';
import { ApiError, UnauthorizedError } from '../../domain/core/models/errors/globalError.ts';

export default class ReactionGatewayApi implements ReactionGatewayInterface {
    async addReaction(postId: number, reaction: ReactionType): Promise<UserReactionWithLikesDislikes | null> {
        try {
            const response = await axiosInstance({
                method: 'POST',
                url: `reaction/post/${postId}`,
                data: {
                    reaction: reaction,
                },
            });

            if (response.status === 204) return null;

            return {
                reaction: response.data.reaction?.reaction || null,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
            };
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) throw new UnauthorizedError();
                throw new ApiError('Failed to fetch reaction from API');
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }

    async getReactionForLoggedUser(postId: number): Promise<UserReactionWithLikesDislikes | null> {
        try {
            const response = await axiosInstance({
                method: 'GET',
                url: `reaction/post/${postId}`,
            });

            if (response.status === 204) return null;

            return {
                reaction: response.data.reaction.reaction || null,
                likes: response.data.likes,
                dislikes: response.data.dislikes,
            };
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) throw new UnauthorizedError();
                throw new ApiError('Failed to fetch reaction from API');
            }
            throw new Error('UNKNOWN_ERROR');
        }
    }
}
