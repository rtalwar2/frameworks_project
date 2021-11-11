import {getManager, getRepository, Like} from "typeorm";
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
        const entityManager = getManager();
        if (Array.isArray(request.body)) {
            for (let album of request.body) {
                if (album.artiesten != undefined) {

                    for (let artiest of album.artiesten) {
                        if (artiest.instrument != undefined) {
                            await entityManager.save(Muzikant, artiest)
                        } else if (artiest.toonhoogte != undefined) {
                            await entityManager.save(Zanger, artiest)

                        }
                        // console.log(artiest)
                    }
                }
            }
        } else {
            if (request.body.artiesten != undefined) {
                for (let artiest of request.body.artiesten) {
                    if (artiest.instrument != undefined) {
                        await entityManager.save(Muzikant, artiest)
                    } else if (artiest.toonhoogte != undefined) {
                        await entityManager.save(Zanger, artiest)

                    }
                    // console.log(artiest)
                }
            }
        }
        return this.albumRepo.save(request.body);
    }


    async addSongs(request: Request, response: Response, next: NextFunction) {
        let albumToaddSong = await this.albumRepo.findOne(request.params.id);
        if (Array.isArray(request.body)) {

            for (let song of request.body) {
                albumToaddSong.liedjes.push(song);
            }
        } else {
            albumToaddSong.liedjes.push(request.body);
        }
        return this.albumRepo.save(albumToaddSong);
    }

    async addArtists(request: Request, response: Response, next: NextFunction) {
        console.log("ik wordt uitgevoerd")
        let albumToaddArtist = await this.albumRepo.findOne(request.params.id);
        const entityManager = getManager(); // you can also get it via getConnection().manager
        let arr = []
        if (!Array.isArray(request.body)) {
            arr.push(request.body)
        } else {
            arr = request.body
        }
        for (let artiest of arr) {
            albumToaddArtist.artiesten.push(artiest);
            if (artiest.instrument != undefined) {
                await entityManager.save(Muzikant, artiest)
            } else if (artiest.toonhoogte != undefined) {
                await entityManager.save(Zanger, artiest)
            }
        }
        return this.albumRepo.save(albumToaddArtist);
    }


    async remove(request: Request, response: Response, next: NextFunction) {
        let albumToRemove = await this.albumRepo.findOne(request.params.id);
        if (albumToRemove != undefined) {
            await this.albumRepo.remove(albumToRemove);

        } else {
            return new Error("het album bestaat niet")
        }
    }

    async search_titel(request: Request, response: Response, next: NextFunction) {
        let zoek = "%" + request.query.titel + "%"
        return this.albumRepo.find({titel: Like(zoek)});
    }

}
