import ReactionGatewayInterface from '../../domain/reactions/port/reaction-gateway-interface.ts';
import { ReactionType, UserReactionWithLikesDislikes } from '../../domain/reactions/models/reaction.ts';

export default class ReactionGatewayInMemory implements ReactionGatewayInterface {
    public reaction: ReactionType | null = null;
    public error = false;
    private _likes = 1;
    private _dislikes = 0;

    public async getReactionForLoggedUser(): Promise<UserReactionWithLikesDislikes> {
        if (this.error) {
            throw new Error('Internal Server Error');
        }
        return {
            reaction: this.reaction,
            likes: this._likes,
            dislikes: this._dislikes,
        };
    }

    public async addReaction(_: number, reaction: ReactionType): Promise<UserReactionWithLikesDislikes> {
        if (this.error) {
            throw new Error('Internal Server Error');
        }
        this.reaction = reaction;
        return {
            reaction: this.reaction,
            likes: reaction === ReactionType.like ? this._likes + 1 : this._likes,
            dislikes: reaction === ReactionType.dislike ? this._dislikes + 1 : this._dislikes,
        };
    }

    public shouldThrowError(): void {
        this.error = true;
    }
}
