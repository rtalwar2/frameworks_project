import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import {Album} from "./Album";

@Entity()
export class Genre {

    constructor(naam: string, origine: string, albums: Album[]) {
        this.naam = naam;
        this.origine = origine;
        this.albums = albums;
    }

    @PrimaryColumn()
    naam: string;

    @Column()
    origine: string;

    @OneToMany(()=>Album,album=>album.genre)
    albums:Album[]

}
