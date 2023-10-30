import { Tag } from '../../tags/models/tag.model.ts';

export type Post = {
    id: number;
    title: string;
    slug: string;
    command: string;
    description: string;
    message: string;
    created_at: string;
    updated_at: string | null;
    published_at: string | null;
    tags: Tag[];
    user_id: number;
    username: string;
};

export interface PostState {
    data: Post[];
    error: boolean;
    loading: boolean;
}
