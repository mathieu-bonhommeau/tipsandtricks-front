import { Tips, TipsInput } from '../models/tips.model';
import GatewayInterface from '../../core/port/gatewayInterface.ts';
import { PaginatedResponse } from '../../core/models/paginatedResponse.ts';
import { InputCreatePost, Post } from '../../posts/models/post.model.ts';

export interface TipsGatewayInterface extends GatewayInterface {
    getTips(page: number, length: number): Promise<PaginatedResponse<Tips>>;
    createTips(tips: TipsInput): Promise<Tips>;
    deleteTip(tipsId: number): Promise<number>;
    shareTips(tipsToShare: InputCreatePost): Promise<Post>;
}
