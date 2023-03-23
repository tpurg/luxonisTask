import { Flats } from '../models/flat.model';
import { FlatService } from '../service/flat.service';

export class FlatController {
    private flatService: FlatService;

    constructor() {
        this.flatService = new FlatService();
    }

    async getFlats(limit: number | undefined, offset: number | undefined) {
        return await this.flatService.getFlats(limit, offset);
    }

    async getFlatsNumber() {
        return await this.flatService.getFlatsNumber();
    }

    async createFlat(flat: Flats) {
        return await this.flatService.createFlat(flat);
    }

    async updateFlat(flat: Flats) {
        return await this.flatService.updateFlat(flat);
    }

    async deleteFlat(flatId: string) {
        return await this.flatService.deleteFlat(flatId);
    }
}