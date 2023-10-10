import { TipsGatewayInterface } from "../../domain/tips/port/tips-gateway.interface";
import { Tips } from "../../domain/tips/models/tips.model";



const FAKE_TIPS: Tips[] = [
    { id: 1, title: 'Conseil 1', command: "Ctrl +", description: 'Description pour le conseil 1', published_at: '2022-12-17T03:24:00', created_at: '2022-12-17T03:24:00', updated_at: null, user_id: 1, tags: [{ id: 1, label: "Tag 1", created_at: '2022-12-17T03:24:00', updated_at: '2022-12-17T03:24:00' }, { id: 2, label: "Tag 2", created_at: '2022-12-17T03:24:00', updated_at: '2022-12-17T03:24:00' }] },
    { id: 2, title: 'Conseil 2', command: "Ctrl +", description: 'Description pour le conseil 2', published_at: '2022-12-17T03:24:00', created_at: '2022-12-17T03:24:00', updated_at: null, user_id: 1, tags: [{ id: 1, label: "Tag 1", created_at: '2022-12-17T03:24:00', updated_at: '2022-12-17T03:24:00' }] },
    { id: 3, title: 'Conseil 3', command: "Ctrl +", description: 'Description pour le conseil 3', published_at: '2022-12-17T03:24:00', created_at: '2022-12-17T03:24:00', updated_at: null, user_id: 1, tags: [{ id: 1, label: "Tag 1", created_at: '2022-12-17T03:24:00', updated_at: '2022-12-17T03:24:00' }, { id: 2, label: "Tag 2", created_at: '2022-12-17T03:24:00', updated_at: '2022-12-17T03:24:00' }] },
    { id: 4, title: 'Conseil 4', command: "Ctrl +", description: 'Description pour le conseil 4', published_at: '2022-12-17T03:24:00', created_at: '2022-12-17T03:24:00', updated_at: null, user_id: 1, tags: [{ id: 1, label: "Tag 1", created_at: '2022-12-17T03:24:00', updated_at: '2022-12-17T03:24:00' }] },
    { id: 5, title: 'Conseil 5', command: "Ctrl +", description: 'Description pour le conseil 5', published_at: '2022-12-17T03:24:00', created_at: '2022-12-17T03:24:00', updated_at: null, user_id: 1, tags: [{ id: 1, label: "Tag 1", created_at: '2022-12-17T03:24:00', updated_at: '2022-12-17T03:24:00' }, { id: 2, label: "Tag 2", created_at: '2022-12-17T03:24:00', updated_at: '2022-12-17T03:24:00' }] },
    { id: 6, title: 'Conseil 6', command: "Ctrl +", description: 'Description pour le conseil 6', published_at: '2022-12-17T03:24:00', created_at: '2022-12-17T03:24:00', updated_at: null, user_id: 1, tags: [{ id: 1, label: "Tag 1", created_at: '2022-12-17T03:24:00', updated_at: '2022-12-17T03:24:00' }] }
];


export class TipsGatewayApi implements TipsGatewayInterface {
    private tips: Tips[] | [] = FAKE_TIPS;
    private throwError = false;





    async getTips(): Promise<Tips[]> {
        if (this.throwError) {
            throw new Error("Internal Server Error");
        }
        return Promise.resolve(this.tips);
    }






}