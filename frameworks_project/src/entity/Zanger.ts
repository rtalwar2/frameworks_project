import {Entity, Column} from "typeorm";
import {Artiest} from "./Atriest";
import {TOONHOOGTES} from "./TOONHOOGTES"
import {Adres} from "./Adres";

@Entity()
export class Zanger extends Artiest {

    constructor(naam: string, geboortedatum: Date, adres: Adres, toonhoogte: TOONHOOGTES) {
        super(naam, geboortedatum, adres);
        this.toonhoogte = toonhoogte;
    }

    @Column()
    toonhoogte: TOONHOOGTES;



}
