import {createQueryBuilder, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {Genre} from "../entity/Genre";

export class GenreDAO {

    private genreRepo = getRepository(Genre);

    async all(request: Request, response: Response, next: NextFunction) {
        //return this.genreRepo.createQueryBuilder("genre")
           // .leftJoinAndSelect("genre.albums", "album").getMany();
        //return  createQueryBuilder("genre").leftJoinAndSelect()getMany();
        return  await this.genreRepo.createQueryBuilder("genre")
            .leftJoinAndSelect("genre.albums", "album").getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return await this.genreRepo.createQueryBuilder("genre")
            .leftJoinAndSelect("genre.albums", "album")
            .where("genre.naam = :naam", { naam: request.params.naam })
            .getOne();
    }

    /*async insert(request: Request, response: Response, next: NextFunction) {
        return this.genreRepo.save(request.body);
    }*/

    async remove(request: Request, response: Response, next: NextFunction) {
        let genreToRemove = await this.genreRepo.findOne(request.params.naam);
        await this.genreRepo.remove(genreToRemove);
    }
    /*async update(request: Request, response: Response, next: NextFunction) {
        let genre_to_edit = await this.genreRepo.findOne(request.params.naam);
        if (genre_to_edit != undefined) {
            genre_to_edit.origine = request.body.titel;
            genre_to_edit.albums = request.body.duur;
            return this.liedjeRepo.save(genre_to_edit);
        } else {
            return new Error("het genre bestaat niet")
        }
    }*/

}
