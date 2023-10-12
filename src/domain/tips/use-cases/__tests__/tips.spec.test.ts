import { beforeEach, describe, expect, test } from 'vitest';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { Tips } from "../../models/tips.model";
import TipsTestBuilder from "./tipsTestBuilder";
import { TipsGatewayInMemory } from '../../../../server-side/tips/tips-gateway.inMemory';
import { setupStore } from '../../../store';
import { getTips } from '../tips.actions';



let store: ToolkitStore;
let sut: SUT;
let tipsGatewayInMemory: TipsGatewayInMemory;


beforeEach(() => {
    store = setupStore();
    sut = new SUT();
    tipsGatewayInMemory = new TipsGatewayInMemory;
    tipsGatewayInMemory.setTips(sut.generateArrayOfTips(6));
    if (typeof global.navigator === 'undefined') {
        global.navigator = {} as any;
    }
});


describe('when a user is on the tips bank page', () => {
    test('when the request to retrieve their tips is successful his tips are retrived', async () => {


        const expectedTips = sut.generateArrayOfTips(2);

        await store.dispatch(
            getTips({ tipsGatewayInterface: tipsGatewayInMemory, page: 1, length: 2 }),
        );

        expect(store.getState().tipsReducer.data).toEqual(expectedTips);
        expect(store.getState().tipsReducer.totalTips).toEqual(6);


    });


    test('when there is a server error, it is reflected in the state', async () => {
        tipsGatewayInMemory.simulateServerError();

        await store.dispatch(getTips({ tipsGatewayInterface: tipsGatewayInMemory, page: 1, length: 2 }));

        expect(store.getState().tipsReducer.error).toBe(true);
    });



    test('it retrieves the correct tips for the second page', async () => {
        const expectedTipsPage2 = sut.generateArrayOfTips(4).slice(2, 4);

        await store.dispatch(
            getTips({ tipsGatewayInterface: tipsGatewayInMemory, page: 2, length: 2 }),
        );

        expect(store.getState().tipsReducer.data).toEqual(expectedTipsPage2);
    });



    test('it retrieves the correct tips for the third page', async () => {
        const expectedTipsPage3 = sut.generateArrayOfTips(6).slice(4, 6);

        await store.dispatch(
            getTips({ tipsGatewayInterface: tipsGatewayInMemory, page: 3, length: 2 }),
        );

        expect(store.getState().tipsReducer.data).toEqual(expectedTipsPage3);
    });



});












class SUT {
    private _tipsTestBuilder: TipsTestBuilder;
    constructor() {
        this._tipsTestBuilder = new TipsTestBuilder();
    }

    generateArrayOfTips(size: number): Tips[] {
        const tipsArray: Tips[] = [];
        for (let i = 0; i < size; i++) {
            tipsArray.push(this._tipsTestBuilder.buildTips());
        }
        return tipsArray;
    }
}







