import { PaginatedResponse, TipsGatewayInterface } from "../../domain/tips/port/tips-gateway.interface";
import { Tips } from "../../domain/tips/models/tips.model";
import axios from 'axios';




export class TipsGatewayApi implements TipsGatewayInterface {

    async getTips(page: number, length: number): Promise<PaginatedResponse<Tips>> {
        try {
            const response = await axios({
                method: 'GET',
                url: `${import.meta.env.VITE_API_URL}/api/tips?page=${page}&length=${length}`,
                withCredentials: true,
            });

            console.log(response.data.data);
            return response.data;

        } catch (error) {
            throw new Error("Failed to fetch tips from API");
        }
    }
}