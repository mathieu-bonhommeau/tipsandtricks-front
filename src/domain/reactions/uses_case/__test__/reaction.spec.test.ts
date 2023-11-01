import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';
import { setupStore } from '../../../store.ts';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Params } from '../../../core/handlers/handle.errors.ts';
import ReactionGatewayInMemory from '../../../../server-side/reaction/reaction-gateway.inMemory.ts';
import { Post } from '../../../posts/models/post.model.ts';
import PostsTestBuilder from '../../../posts/use-cases/__test__/postsTestBuilder.ts';
import { addReaction, getReactionForLoggedUser } from '../reaction.actions.ts';
import { ReactionType } from '../../models/reaction.ts';

describe('when a user interact with a post', () => {
    let store: ToolkitStore;
    let sut: SUT;
    let reactionGatewayInMemory: ReactionGatewayInMemory;
    let mockNavigate: Mock;
    let params: Params;
    let post: Post;

    beforeEach(() => {
        store = setupStore();
        reactionGatewayInMemory = new ReactionGatewayInMemory();
        sut = new SUT(reactionGatewayInMemory);
        mockNavigate = vi.fn();
        params = {
            gatewayInterface: reactionGatewayInMemory,
            navigate: mockNavigate,
        };
        post = sut.givenAPost();
    });

    test('should see if he had interacted with the post and its type (like, or dislike)', async () => {
        sut.generateAPostReaction(ReactionType.like);
        await store.dispatch(getReactionForLoggedUser({ params, postId: post.id }));
        expect(store.getState().reactionReducer.reactions[post.id]).toEqual({
            postReaction: ReactionType.like,
            likes: 1,
            dislikes: 0,
            loading: false,
            error: false,
        });
    });

    test('should see no interaction if he had not interacted with the post', async () => {
        await store.dispatch(getReactionForLoggedUser({ params, postId: post.id }));
        expect(store.getState().reactionReducer.reactions[post.id]).toEqual({
            postReaction: null,
            likes: 1,
            dislikes: 0,
            loading: false,
            error: false,
        });
    });

    test('should change the interaction when the user interacts with the post', async () => {
        sut.generateAPostReaction(ReactionType.like);
        await store.dispatch(addReaction({ params, postId: post.id, reactionType: ReactionType.dislike }));
        expect(store.getState().reactionReducer.reactions[post.id]).toEqual({
            postReaction: ReactionType.dislike,
            likes: 1,
            dislikes: 1,
            loading: false,
            error: false,
        });
    });
});

class SUT {
    private _postTestBuilder: PostsTestBuilder;
    constructor(private readonly _reactionGatewayInMemory: ReactionGatewayInMemory) {
        this._postTestBuilder = new PostsTestBuilder();
    }

    givenAPost(): Post {
        return this._postTestBuilder.buildPost();
    }

    generateAPostReaction(reactionType: ReactionType | null): void {
        this._reactionGatewayInMemory.reaction = reactionType;
    }
}
