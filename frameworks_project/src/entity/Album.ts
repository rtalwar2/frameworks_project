import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable, ManyToMany, ManyToOne} from "typeorm";
import {Liedje} from "./Liedje";
import {Genre} from "./Genre";
import {Artiest} from "./Atriest";


@Entity()
export abstract class Album {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titel: string;


    @Column()
    label: string;

    @ManyToMany(() => Liedje, {cascade: true,eager:true})
    @JoinTable()
    liedjes: Liedje[];


    @ManyToMany(() => Artiest,{eager:true})
    @JoinTable()
    artiesten: Artiest[];


    @ManyToOne(() => Genre, genre => genre.albums,{cascade:true,eager:true})
    genre: Genre;
}
