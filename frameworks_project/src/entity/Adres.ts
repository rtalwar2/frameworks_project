import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Adres {

    constructor(straat: string, postcode: number, gemeente: string, land: string) {
        this.straat = straat;
        this.postcode = postcode;
        this.gemeente = gemeente;
        this.land = land;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    straat: string;

    @Column()
    postcode: number;

    @Column()
    gemeente: string;

    @Column()
    land: string;

}
