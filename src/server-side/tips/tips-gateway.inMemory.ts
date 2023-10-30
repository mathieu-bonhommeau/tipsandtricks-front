import { TipsGatewayInterface } from '../../domain/tips/port/tips-gateway.interface';
import { Tips } from '../../domain/tips/models/tips.model';
import { PaginatedResponse } from '../../domain/core/models/paginatedResponse.ts';

export class TipsGatewayInMemory implements TipsGatewayInterface {
    public tips: Tips[] | [] = [];
    public throwError = false;

    simulateServerError() {
        this.throwError = true;
    }

    async getTips(page: number, length: number): Promise<PaginatedResponse<Tips>> {
        if (this.throwError) {
            throw new Error('Internal Server Error');
        }

        const start = (page - 1) * length;
        const end = start + length;

        const paginatedTips = this.tips.slice(start, end);

        const response: PaginatedResponse<Tips> = {
            page: page,
            lengthPerPage: length,
            total: this.tips.length,
            data: paginatedTips,
        };
        return Promise.resolve(response);
    }

    async deleteTip(tipsId: number): Promise<void> {
        if (this.throwError) {
            throw new Error('Internal Server Error');
        }

        this.tips.splice(tipsId - 1, 1);

        return Promise.resolve();
    }
    setTips(tips: Tips[]): void {
        this.tips = tips;
    }
}
