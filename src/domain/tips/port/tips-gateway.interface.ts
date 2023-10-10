import { Tips } from "../models/tips.model";



export interface TipsGatewayInterface {
    getTips(): Promise<Tips[]>;
}    