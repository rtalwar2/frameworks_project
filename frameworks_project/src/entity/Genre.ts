import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import {Album} from "./Album";

@Entity()
export class Genre {

    @PrimaryColumn()
    naam: string;

    @Column()
    origine: string;

    @OneToMany(()=>Album,album=>album.genre)
    album:Album

}
