import {Entity, Column} from "typeorm";
import {Artiest} from "./Atriest";
import {Adres} from "./Adres";

@Entity()
export class Muzikant extends Artiest {

    constructor(naam: string, geboortedatum: Date, adres: Adres, instrument: string) {
        super(naam, geboortedatum, adres);
        this.instrument = instrument;
    }

    @Column()
    instrument: string;


}
