import {Entity, PrimaryGeneratedColumn, TableInheritance, Column, OneToOne, JoinColumn, ChildEntity} from "typeorm";
import {Adres} from "./Adres";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Artiest {

    constructor(naam: string, geboortedatum: Date, adres: Adres) {
        this.naam = naam;
        this.geboortedatum = geboortedatum;
        this.adres = adres;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naam: string;

    @Column()
    geboortedatum: Date;

    @OneToOne(() => Adres, {cascade: true})
    @JoinColumn()
    adres: Adres;


}
