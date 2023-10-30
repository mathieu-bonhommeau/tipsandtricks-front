import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";
import {Params} from "../../../core/handlers/handle.errors.ts";
import {setupStore} from "../../../store.ts";
import PostGatewayInMemory from "../../../../server-side/post/post-gateway.inMemory.ts";
import PostsTestBuilder from "./postsTestBuilder.ts";
import {Post} from "../../models/post.model.ts";
import {getPosts} from "../post.actions.ts";
import {faker} from "@faker-js/faker";

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

    test('should retrieve the posts', async () => {
        const expectedPosts = postGatewayInMemory.posts.slice(0, 2)
        await store.dispatch(getPosts({ params, start: 0, length: 2 }));

        expect(store.getState().postReducer.data).toEqual(expectedPosts);
        expect(store.getState().postReducer.totalReceived).toEqual(2);
    })

    test('should retrieve more posts when the user asks more n posts', async () => {
        let expectedAddingPosts  = postGatewayInMemory.posts.slice(0, 4);
        await store.dispatch(getPosts({ params, start: 0, length: 2 }));
        await store.dispatch(getPosts({ params, start: 2, length: 2 }));
        expect(store.getState().postReducer.data).toEqual(expectedAddingPosts);
        expect(store.getState().postReducer.totalReceived).toEqual(4);

        expectedAddingPosts  = postGatewayInMemory.posts.slice(0, 6);
        await store.dispatch(getPosts({ params, start: 4, length: 2 }));
        expect(store.getState().postReducer.data).toEqual(expectedAddingPosts);
        expect(store.getState().postReducer.totalReceived).toEqual(6);
    })

    test('when there is a server error, it is reflected in the state', async () => {
        postGatewayInMemory.simulateServerError();

        await store.dispatch(getPosts({ params, start: 0, length: 2 }));

        expect(store.getState().postReducer.error).toBe(true);
    });
})

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
                    .buildPost()
            );
        }
        return postsArray;
    }
}