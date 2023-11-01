import { ReactionType, UserReactionWithLikesDislikes } from '../models/reaction.ts';

export default interface ReactionGatewayInterface {
    getReactionForLoggedUser(postId: number): Promise<UserReactionWithLikesDislikes | null>;
    addReaction(postId: number, reaction: ReactionType): Promise<UserReactionWithLikesDislikes | null>;
}
