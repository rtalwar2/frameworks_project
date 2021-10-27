import {Entity, Column} from "typeorm";
import {Artiest} from "./Atriest";
import {TOONHOOGTES} from "./TOONHOOGTES"

@Entity()
export class Zanger extends Artiest {

    @Column()
    toonhoogte: TOONHOOGTES;



}
