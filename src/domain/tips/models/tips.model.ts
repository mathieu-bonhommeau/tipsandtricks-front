import { Tag } from '../../tags/models/tag.model';

export type Tips = {
    id: number;
    title: string;
    command: string;
    description: string;
    published_at: string;
    created_at: string;
    updated_at: string | null;
    user_id: number;
    tags: Tag[];
};

export type TipsInput = {
    title: string;
    command: string;
    description: string | null;
};

export interface TipsState {
    data: Tips[];
    error: boolean;
    totalTips: number;
    loading: boolean;
    createTipsError: boolean;
    updateTipsError: boolean;
}

export type TipsUpdateInput = {
    id: number;
    title?: string;
    command?: string;
    description?: string | null;
};
