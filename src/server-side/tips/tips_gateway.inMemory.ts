import { TipsGatewayInterface } from "../../domain/tips/port/tips-gateway.interface";
import { Tips } from "../../domain/tips/models/tips.model";


export class TipsGatewayInMemory implements TipsGatewayInterface {
    private tips: Tips[] | [] = [];
    private throwError = false;


    simulateServerError() {
        this.throwError = true;
    }


    async getTips(): Promise<Tips[]> {
        if (this.throwError) {
            throw new Error("Internal Server Error");
        }
        return Promise.resolve(this.tips);
    }



    setTips(tips: Tips[]): void {
        this.tips = tips
    }


}


