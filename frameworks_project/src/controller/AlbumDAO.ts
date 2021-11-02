import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Album} from "../entity/Album";



export class AlbumDAO {

    private albumRepo = getRepository(Album);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.albumRepo.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.albumRepo.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.albumRepo.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let albumToRemove = await this.albumRepo.findOne(request.params.id);
        await this.albumRepo.remove(albumToRemove);
    }

}
