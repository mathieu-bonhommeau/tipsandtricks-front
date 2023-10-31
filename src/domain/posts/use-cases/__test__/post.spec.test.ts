import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Params } from '../../../core/handlers/handle.errors.ts';
import { setupStore } from '../../../store.ts';
import PostGatewayInMemory from '../../../../server-side/post/post-gateway.inMemory.ts';
import PostsTestBuilder from './postsTestBuilder.ts';
import { Post } from '../../models/post.model.ts';
import {saveTips, getPosts} from '../post.actions.ts';
import { faker } from '@faker-js/faker';
import {Tips} from "../../../tips/models/tips.model.ts";

describe('when a user is on the feed page', () => {
    let store: ToolkitStore;
    let sut: SUT;
    let postGatewayInMemory: PostGatewayInMemory;
    let mockNavigate: Mock;
    let params: Params;

    beforeEach(() => {
        store = setupStore();
        sut = new SUT();
        postGatewayInMemory = new PostGatewayInMemory();
        postGatewayInMemory.setTips(sut.generateArrayOfPosts(6));
        mockNavigate = vi.fn();
        params = {
            gatewayInterface: postGatewayInMemory,
            navigate: mockNavigate,
        };
    });

    describe('retrieve posts', () => {
        test('should retrieve the posts', async () => {
            const expectedPosts = postGatewayInMemory.posts.slice(0, 2);
            await store.dispatch(getPosts({ params, start: 0, length: 2 }));

            expect(store.getState().postReducer.data).toEqual(expectedPosts);
            expect(store.getState().postReducer.data.length).toEqual(2);
        });

        test('should retrieve more posts when the user asks more n posts', async () => {
            let expectedAddingPosts = postGatewayInMemory.posts.slice(0, 4);
            await store.dispatch(getPosts({ params, start: 0, length: 2 }));
            await store.dispatch(getPosts({ params, start: 2, length: 2 }));
            expect(store.getState().postReducer.data).toEqual(expectedAddingPosts);
            expect(store.getState().postReducer.data.length).toEqual(4);

            expectedAddingPosts = postGatewayInMemory.posts.slice(0, 6);
            await store.dispatch(getPosts({ params, start: 4, length: 2 }));
            expect(store.getState().postReducer.data).toEqual(expectedAddingPosts);
            expect(store.getState().postReducer.data.length).toEqual(6);
        });

        test('when there is a server error, it is reflected in the state', async () => {
            postGatewayInMemory.simulateServerError();
            await store.dispatch(getPosts({ params, start: 0, length: 2 }));
            expect(store.getState().postReducer.error).toBe(true);
        });
    })

    describe('add tips in tips board', () => {
        test('should save a tips in personal tips board from a post', async () => {
            const postToTips = postGatewayInMemory.posts[0];
            const test = await store.dispatch(saveTips({ params, post: postToTips }));
            expect(test.payload).toEqual(sut.generateTipsFromPost(postToTips))
            expect(store.getState().postReducer.savedTips).toEqual(sut.generateTipsFromPost(postToTips));
        })

        test('when there is a server error, it is reflected in the state', async () => {
            postGatewayInMemory.simulateServerError();
            const postToTips = postGatewayInMemory.posts[0];
            await store.dispatch(saveTips({ params, post: postToTips }));
            expect(store.getState().postReducer.error).toBe(true);
        })
    })

});

class SUT {
    private _postsTestBuilder: PostsTestBuilder;
    constructor() {
        this._postsTestBuilder = new PostsTestBuilder();
    }

    generateArrayOfPosts(size: number): Post[] {
        const postsArray: Post[] = [];
        for (let i = 0; i < size; i++) {
            postsArray.push(
                this._postsTestBuilder
                    .setId(i)
                    .setTitle(faker.lorem.words(3))
                    .setCommand(faker.lorem.sentence())
                    .setDescription(faker.lorem.paragraph())
                    .setMessage(faker.lorem.paragraph())
                    .setSlug(faker.lorem.slug())
                    .buildPost(),
            );
        }
        return postsArray;
    }

    generateTipsFromPost(post: Post): Tips {
        return {
            id: post.id,
            user_id: post.user_id,
            title: post.title,
            command: post.command,
            description: post.description,
            published_at: post.published_at,
            created_at: post.created_at,
            updated_at: post.updated_at,
            tags: post.tags || []
        }
    }
}
