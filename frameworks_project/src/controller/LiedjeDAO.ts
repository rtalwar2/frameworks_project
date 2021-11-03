import {getRepository, Like} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Album} from "../entity/Album";
import {Liedje} from "../entity/Liedje";
import * as console from "console";


export class LiedjeDAO {

    private liedjeRepo = getRepository(Liedje);

    async get_all(request: Request, response: Response, next: NextFunction) {
        return this.liedjeRepo.find();
    }

    async get_one(request: Request, response: Response, next: NextFunction) {
        return this.liedjeRepo.findOne(request.params.id);
    }

    async search_titel(request: Request, response: Response, next: NextFunction) {
        let zoek = "%" + request.query.titel + "%"
        return this.liedjeRepo.find({titel: Like(zoek)});
        // return this.liedjeRepo.find();

    }

    async insert(request: Request, response: Response, next: NextFunction) {
        return this.liedjeRepo.save(request.body);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let song = await this.liedjeRepo.findOne(request.params.id);
        if (song != undefined) {
            song.titel = request.body.titel;
            song.duur = request.body.duur;
            song.writer = request.body.writer;
            return this.liedjeRepo.save(song);
        } else {
            return new Error("het liedje bestaat niet")
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let liedjeToRemove = await this.liedjeRepo.findOne(request.params.id);
        if (liedjeToRemove != undefined) {
            await this.liedjeRepo.remove(liedjeToRemove);
        } else {
            return new Error("het liedje bestaat niet")
        }
    }

}
