import {Entity, Column, ChildEntity} from "typeorm";
import {Artiest} from "./Atriest";
import {Adres} from "./Adres";

@ChildEntity()
export class Muzikant extends Artiest {

    constructor(naam: string, geboortedatum: Date, adres: Adres, instrument: string) {
        super(naam, geboortedatum, adres);
        this.instrument = instrument;
    }

    @Column()
    instrument: string;


}
