import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Tips } from '../../models/tips.model';
import TipsTestBuilder from './tipsTestBuilder';
import { TipsGatewayInMemory } from '../../../../server-side/tips/tips-gateway.inMemory';
import { setupStore } from '../../../store';
import { getTips, deleteTip, shareTip } from '../tips.actions';
import { Params } from '../../../core/handlers/handle.errors.ts';
import { faker } from '@faker-js/faker';
import { InputCreatePost, Post } from '../../../posts/models/post.model.ts';

let store: ToolkitStore;
let sut: SUT;
let tipsGatewayInMemory: TipsGatewayInMemory;
let mockNavigate: Mock;
let params: Params;

beforeEach(() => {
    store = setupStore();
    sut = new SUT();
    tipsGatewayInMemory = new TipsGatewayInMemory();
    tipsGatewayInMemory.setTips(sut.generateArrayOfTips(6));
    mockNavigate = vi.fn();
    params = {
        gatewayInterface: tipsGatewayInMemory,
        navigate: mockNavigate,
    };
});

describe('when a user is on the tips bank page', () => {
    test('when the request to retrieve their tips is successful his tips are retrived', async () => {
        const expectedTips = tipsGatewayInMemory.tips.slice(0, 2);
        await store.dispatch(getTips({ params, page: 1, length: 2 }));

        expect(store.getState().tipsReducer.data).toEqual(expectedTips);
        expect(store.getState().tipsReducer.totalTips).toEqual(6);
    });

    test('when there is a server error, it is reflected in the state', async () => {
        tipsGatewayInMemory.simulateServerError();

        await store.dispatch(getTips({ params, page: 1, length: 2 }));

        expect(store.getState().tipsReducer.error).toBe(true);
    });

    test('it retrieves the correct tips for the second page', async () => {
        const expectedTipsPage2 = tipsGatewayInMemory.tips.slice(2, 4);

        await store.dispatch(getTips({ params, page: 2, length: 2 }));

        expect(store.getState().tipsReducer.data).toEqual(expectedTipsPage2);
    });

    test('it retrieves the correct tips for the third page', async () => {
        const expectedTipsPage3 = tipsGatewayInMemory.tips.slice(4, 6);

        await store.dispatch(getTips({ params, page: 3, length: 2 }));

        expect(store.getState().tipsReducer.data).toEqual(expectedTipsPage3);
    });
});

describe('when a user want to deleted a tips', () => {
    test('when the request to delete a tips is successful', async () => {
        await store.dispatch(deleteTip({ params, tipsId: 1 }));

        // Update Tips reducer
        await store.dispatch(getTips({ params, page: 1, length: 6 }));

        expect(store.getState().tipsReducer.totalTips).toEqual(5);
    });

    test('when there is a server error, it is reflected in the state', async () => {
        tipsGatewayInMemory.simulateServerError();

        await store.dispatch(deleteTip({ params, tipsId: 1 }));

        expect(store.getState().tipsReducer.error).toBe(true);
    });
});

describe('when a user want to share a tips', () => {
    test('when the request to share a tips is successful', async () => {
        const tipsToShare = sut.givenATipsToShare();
        const expectedPost = sut.givenPostFromTips(tipsToShare);
        await store.dispatch(shareTip({ params, tipsToShare }));
        const newPost = await store.getState().tipsReducer.shareTips;
        expect(newPost).toEqual(
            expect.objectContaining({
                id: expectedPost.id,
                title: expectedPost.title,
                slug: expectedPost.slug,
                command: expectedPost.command,
                description: expectedPost.description,
                message: expectedPost.message,
                tags: expectedPost.tags,
                reactions: expectedPost.reactions,
            }),
        );
    });

    test('when there is a server error, it is reflected in the state', async () => {
        tipsGatewayInMemory.simulateServerError();

        await store.dispatch(shareTip({ params, tipsToShare: sut.givenATipsToShare() }));

        expect(store.getState().tipsReducer.error).toBe(true);
    });
});

class SUT {
    private _tipsTestBuilder: TipsTestBuilder;

    constructor() {
        this._tipsTestBuilder = new TipsTestBuilder();
    }

    givenATipsToShare(): InputCreatePost {
        return {
            ...tipsGatewayInMemory.tips[0],
            message: faker.lorem.paragraph(),
        };
    }

    givenPostFromTips(input: InputCreatePost): Post {
        return {
            id: 1,
            title: input.title,
            slug: 'post-slug',
            command: input.command,
            description: input.description,
            message: input.message,
            created_at: new Date().toISOString(),
            updated_at: null,
            published_at: new Date().toISOString(),
            tags: [],
            user_id: 1,
            username: 'username',
            reactions: {
                like: 0,
                dislike: 0,
            },
        };
    }

    generateArrayOfTips(size: number): Tips[] {
        const tipsArray: Tips[] = [];
        for (let i = 0; i < size; i++) {
            tipsArray.push(
                this._tipsTestBuilder
                    .setId(i)
                    .setTitle(faker.lorem.words(3))
                    .setCommand(faker.lorem.sentence())
                    .setDescription(faker.lorem.paragraph())
                    .buildTips(),
            );
        }
        return tipsArray;
    }
}
