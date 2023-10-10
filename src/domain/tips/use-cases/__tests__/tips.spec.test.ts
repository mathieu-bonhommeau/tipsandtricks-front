import { beforeEach, describe, expect, Mock, test } from 'vitest';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { Tips } from "../../models/tips.model";
import TipsTestBuilder from "./tipsTestBuilder";
import { TipsGatewayInMemory } from '../../../../server-side/tips/tips_gateway.inMemory';
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
});


describe('when a user is on the tips bank page', () => {
    test('when the request to retrieve their tips is successful his tips are retrived', async () => {


        const expectedTips = sut.generateArrayOfTips(6);

        await store.dispatch(
            getTips({ tipsGatewayInterface: tipsGatewayInMemory }),
        );

        expect(store.getState().tipsReducer.tips).toEqual(expectedTips);
    });


    test('when there is a server error, it is reflected in the state', async () => {
        tipsGatewayInMemory.simulateServerError();

        await store.dispatch(getTips({ tipsGatewayInterface: tipsGatewayInMemory }));

        expect(store.getState().tipsReducer.error).toBe('Internal Server Error');
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







