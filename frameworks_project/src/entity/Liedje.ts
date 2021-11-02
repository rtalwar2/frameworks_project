import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Liedje {


    constructor(titel: string, duur: number, writer: string) {
        this.titel = titel;
        this.duur = duur;
        this.writer = writer;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titel: string;

    @Column()
    duur: number;

    @Column()
    writer: string;

}
