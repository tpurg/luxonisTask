import {Flats} from "../models/flat.model";
import {FlatRepository} from "../repository/flat.repository";

export class FlatService {
    private flatRepository: FlatRepository;

    constructor() {
        this.flatRepository = FlatRepository.getInstance();
    }

    async getFlats(limit: number | undefined, offset: number | undefined) {
        return await this.flatRepository.getFlats(limit, offset);
    }

    async getFlatsNumber() {
        return await this.flatRepository.getFlatsNumber();
    }

    async createFlat(flat: Flats) {
        return await this.flatRepository.createFlat(flat);
    }

    async updateFlat(flat: Flats) {
        return await this.flatRepository.updateFlat(flat);
    }

    async deleteFlat(flatId: string) {
        return await this.flatRepository.deleteFlat(flatId);
    }
}