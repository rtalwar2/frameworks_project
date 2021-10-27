import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable, ManyToMany, ManyToOne} from "typeorm";
import {Artiest} from "./Atriest";
import {Liedje} from "./Liedje";
import {Genre} from "./Genre";


@Entity()
export abstract class Album {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titel: string;


    @Column()
    label: string;

    @ManyToMany(() => Liedje)
    @JoinTable()
    liedjes: Liedje[];


    @ManyToMany(() => Artiest)
    @JoinTable()
    artiesten: Artiest[];


    @ManyToOne(()=>Genre, genre => genre.album)
    genre:Genre;
}
