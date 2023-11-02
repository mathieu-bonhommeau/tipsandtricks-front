import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Tips } from '../../models/tips.model';
import TipsTestBuilder from './tipsTestBuilder';
import { TipsGatewayInMemory } from '../../../../server-side/tips/tips-gateway.inMemory';
import { setupStore } from '../../../store';
import { createTips } from '../tips.actions';
import { Params } from '../../../core/handlers/handle.errors.ts';
import { faker } from '@faker-js/faker';

let store: ToolkitStore;
let sut: SUT;
let tipsGatewayInMemory: TipsGatewayInMemory;
let mockNavigate: Mock;
let params: Params;

beforeEach(() => {
    store = setupStore();
    sut = new SUT();
    tipsGatewayInMemory = new TipsGatewayInMemory();
    mockNavigate = vi.fn();
    params = {
        gatewayInterface: tipsGatewayInMemory,
        navigate: mockNavigate,
    };
});

describe('when a user tries to create a new tip', () => {
    test('given a valid tip, it should be added to the store', async () => {
        const newTip = sut.generateTip();

        await store.dispatch(createTips({ params, tips: newTip }));

        expect(store.getState().tipsReducer.data).toContainEqual(newTip);
    });

    test('when there is a server error during creation, it is reflected in the state', async () => {
        tipsGatewayInMemory.simulateServerError();

        const newTip = sut.generateTip();

        await store.dispatch(createTips({ params, tips: newTip }));

        expect(store.getState().tipsReducer.createTipsError).toBe(true);
    });
});

class SUT {
    private _tipsTestBuilder: TipsTestBuilder;

    constructor() {
        this._tipsTestBuilder = new TipsTestBuilder();
    }

    generateTip(): Tips {
        return this._tipsTestBuilder
            .setId(faker.number.int({ min: 1, max: 100 }))
            .setTitle(faker.lorem.words(3))
            .setCommand(faker.lorem.sentence())
            .setDescription(faker.lorem.paragraph())
            .buildTips();
    }
}
