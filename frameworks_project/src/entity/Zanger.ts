import {Entity, Column, ChildEntity} from "typeorm";
import {Artiest} from "./Atriest";
import {TOONHOOGTES} from "./TOONHOOGTES"
import {Adres} from "./Adres";

@ChildEntity()
export class Zanger extends Artiest {

    constructor(naam: string, geboortedatum: Date, adres: Adres, toonhoogte: string) {
        super(naam, geboortedatum, adres);
        this.toonhoogte = toonhoogte;
    }

    @Column()
    toonhoogte:string
    //toonhoogte: TOONHOOGTES;



}
