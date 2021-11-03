import {getManager, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Album} from "../entity/Album";
import * as console from "console";
import {Artiest} from "../entity/Atriest";
import {Zanger} from "../entity/Zanger";
import {Muzikant} from "../entity/Muzikant";


export class AlbumDAO {

    private albumRepo = getRepository(Album);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.albumRepo.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.albumRepo.findOne(request.params.id);
    }

    async insert(request: Request, response: Response, next: NextFunction) {
        const entityManager = getManager(); // you can also get it via getConnection().manager
        //console.log(request.body.artiesten)
        for (let artiest of request.body.artiesten) {
            if (artiest.instrument != undefined) {
                await entityManager.save(Muzikant, artiest)
            } else if (artiest.toonhoogte != undefined) {
                await entityManager.save(Zanger, artiest)

            }
            // console.log(artiest)
        }
        return this.albumRepo.save(request.body);
    }

    async addSongs(request: Request, response: Response, next: NextFunction) {
        let albumToaddSong = await this.albumRepo.findOne(request.params.id);

        for (let song of request.body) {
            albumToaddSong.liedjes.push(song);
        }
        return this.albumRepo.save(albumToaddSong);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let album = await this.albumRepo.findOne(request.params.id);
        if (album != undefined) {
            album.titel = request.body.titel;
            album.label = request.body.label;
            album.liedjes = request.body.liedjes;
            album.artiesten = request.body.artiesten;
            album.genre = request.body.genre;
            return this.albumRepo.save(album);
        } else {
            return new Error("het album bestaat niet")
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let albumToRemove = await this.albumRepo.findOne(request.params.id);
        if (albumToRemove != undefined) {
            await this.albumRepo.remove(albumToRemove);

        } else {
            return new Error("het album bestaat niet")
        }
    }

}
