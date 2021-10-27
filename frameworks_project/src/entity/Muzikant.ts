import {Entity, Column} from "typeorm";
import {Artiest} from "./Atriest";

@Entity()
export class Muzikant extends Artiest {

    @Column()
    instrument: string;


}
