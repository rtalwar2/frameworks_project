import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Adres {

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
