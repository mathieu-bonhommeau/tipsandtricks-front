import { Tag } from '../../tags/models/tag.model.ts';
import { Tips } from '../../tips/models/tips.model.ts';

export type Post = {
    id: number;
    title: string;
    slug: string;
    command: string;
    description: string;
    message: string;
    created_at: string;
    updated_at: string | null;
    published_at: string;
    tags: Tag[];
    user_id: number;
    username: string;
    reactions: {
        like: number;
        dislike: number;
    };
};

export interface PostState {
    data: Post[];
    savedTips: Tips | null;
    error: boolean;
    loading: boolean;
}
