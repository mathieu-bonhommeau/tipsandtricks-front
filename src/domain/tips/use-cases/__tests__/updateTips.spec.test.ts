import { beforeEach, describe, expect, test } from 'vitest';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { Tips } from '../../models/tips.model';
import TipsTestBuilder from './tipsTestBuilder';
import { TipsGatewayInMemory } from '../../../../server-side/tips/tips-gateway.inMemory';
import { setupStore } from '../../../store';
import { createTips, getTips, updateTips } from '../tips.actions';
import { Params } from '../../../core/handlers/handle.errors.ts';
import { faker } from '@faker-js/faker';

let store: ToolkitStore;
let sut: SUT;
let tipsGatewayInMemory: TipsGatewayInMemory;
let params: Params;

beforeEach(() => {
    store = setupStore();
    sut = new SUT();
    tipsGatewayInMemory = new TipsGatewayInMemory();
    tipsGatewayInMemory.setTips(sut.generateArrayOfTips(6));
    params = {
        gatewayInterface: tipsGatewayInMemory,
    };
});

describe('when a user tries to update a tip', () => {
    test('given a valid updated tip, it should be reflected in the store', async () => {
        await store.dispatch(getTips({ params, page: 1, length: 2 }));

        const originalTip = tipsGatewayInMemory.tips[0];

        const updatedTip = { ...originalTip, title: faker.lorem.words(5) };

        await store.dispatch(updateTips({ params, tips: updatedTip }));

        expect(store.getState().tipsReducer.data).toContainEqual(updatedTip);
        expect(store.getState().tipsReducer.data).not.toContainEqual(originalTip);
    });

    test('when there is a server error during update, it is reflected in the state', async () => {
        const originalTip = sut.generateTip();
        await store.dispatch(createTips({ params, tips: originalTip }));

        tipsGatewayInMemory.simulateServerError();
        const updatedTip = { ...originalTip, title: faker.lorem.words(5) };

        await store.dispatch(updateTips({ params, tips: updatedTip }));

        expect(store.getState().tipsReducer.updateTipsError).toBe(true);
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
