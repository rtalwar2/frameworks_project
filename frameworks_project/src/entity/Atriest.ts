import {Entity, PrimaryGeneratedColumn, Column,OneToOne,JoinColumn} from "typeorm";
import {Adres} from "./Adres";

@Entity()
export abstract class Artiest {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naam: string;

    @Column()
    geboortedatum: Date;

    @OneToOne(() => Adres)
    @JoinColumn()
    adres: Adres;


}
