export enum ReactionType {
    like = 'like',
    dislike = 'dislike',
}

export type ReactionState = {
    postReaction: ReactionType | null;
    likes: number;
    dislikes: number;
    loading: boolean;
    error: boolean;
};

// the key of the object is the post id
export type ReactionsState = {
    reactions: { [key: string]: ReactionState };
};

export type UserReactionWithLikesDislikes = {
    reaction: ReactionType | null;
    likes: number;
    dislikes: number;
};
