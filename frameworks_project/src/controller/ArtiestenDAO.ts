import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Artiest} from "../entity/Atriest";

export class ArtiestenDAO {

    private artiestenRepo = getRepository(Artiest);

    async getAll(request: Request, response: Response, next: NextFunction) {
        return this.artiestenRepo.find();
    }

    async get(request: Request, response: Response, next: NextFunction) {
        return this.artiestenRepo.findOne(request.params.id);
    }

    async put(request: Request, response: Response, next: NextFunction) {
        return this.artiestenRepo.save(request.body);
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        let artiest = await this.artiestenRepo.findOne(request.params.id);
        await this.artiestenRepo.remove(artiest);
    }


}
