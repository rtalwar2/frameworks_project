import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Liedje {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titel: string;

    @Column()
    duur: number;

    @Column()
    writer: string;

}
