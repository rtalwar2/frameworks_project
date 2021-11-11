import {createQueryBuilder, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

import {Genre} from "../entity/Genre";

export class GenreDAO {

    private genreRepo = getRepository(Genre);

    async all(request: Request, response: Response, next: NextFunction) {
        return  await this.genreRepo.createQueryBuilder("genre")
            .leftJoinAndSelect("genre.albums", "album").getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return await this.genreRepo.createQueryBuilder("genre")
            .leftJoinAndSelect("genre.albums", "album")
            .where("genre.naam = :naam", { naam: request.params.naam })
            .getOne();
    }


}
