import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface';
import { Tips } from '../../domain/tips/models/tips.model';
import { PaginatedResponse } from '../../domain/core/models/paginatedResponse.ts';
import { InputCreatePost, Post } from '../../domain/posts/models/post.model.ts';

export class TipsGatewayInMemory implements TipsGatewayInterface {
    public tips: Tips[] | [] = [];
    public throwError = false;

    simulateServerError() {
        this.throwError = true;
    }

    async getTips(page: number, length: number): Promise<PaginatedResponse<Tips>> {
        if (this.throwError) {
            throw new Error('Internal Server Error');
        }
        const start = (page - 1) * length;
        const end = start + length;

        const paginatedTips = this.tips.slice(start, end);

        const response: PaginatedResponse<Tips> = {
            page: page,
            lengthPerPage: length,
            total: this.tips.length,
            data: paginatedTips,
        };
        return Promise.resolve(response);
    }


    async createTips(tips: Tips): Promise<Tips> {
        if (this.throwError) {
            throw new Error('Internal Server Error');
        }

        tips.id = this.tips.length + 1;

        this.tips.push(tips);

        return Promise.resolve(tips);
    }


    async deleteTip(tipsId: number): Promise<number> {
        if (this.throwError) {
            throw new Error('Internal Server Error');
        }

        this.tips.splice(tipsId - 1, 1);

        return Promise.resolve(tipsId);
    }

    async shareTips(tipsToShare: InputCreatePost): Promise<Post> {
        if (this.throwError) {
            throw new Error('Internal Server Error');
        }

        return {
            id: 1,
            title: tipsToShare.title,
            slug: 'post-slug',
            command: tipsToShare.command,
            description: tipsToShare.description,
            message: tipsToShare.message,
            created_at: new Date().toISOString(),
            updated_at: null,
            published_at: new Date().toISOString(),
            tags: [],
            user_id: 1,
            username: 'username',
            reactions: {
                like: 0,
                dislike: 0,
            },
        };
    }

    setTips(tips: Tips[]): void {
        this.tips = tips;
    }
}
