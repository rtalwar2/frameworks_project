import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {liedjesRouter} from "./routes";
import {router} from "./routes/index";
import {Liedje} from "./entity/Liedje";
import {Album} from "./entity/Album";
import {Adres} from "./entity/Adres";
import {Muzikant} from "./entity/Muzikant";
import {Genre} from "./entity/Genre";
import {Zanger} from "./entity/Zanger";
import {TOONHOOGTES} from "./entity/TOONHOOGTES";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}))

    // register express routes from defined application routes
    /*Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });*/

    app.use("/liedjes", liedjesRouter)

    app.use("/kaas", router)

    app.use(function (req, res, next) {
        let err = new Error("not found");
        err.name = "404";
        next(err);
    });

    app.use(function (err, req, res, next) {
        res.status(404)
        res.send(err)
    })
    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new albums for test
    //genre:new Genre("superheavymetal","papuanewguinea",[]


    await connection.manager.save(connection.manager.create(Genre, {
        naam: "reggae",
        origine: "Jamaica",
        albums: []
    }));
    let genre_2 = await connection.manager.findOne(Genre, "reggae");

    await connection.manager.save(connection.manager.create(Album, {
        titel: "SKY",
        label: "KING ARTHUR RECORDS",
        liedjes: [new Liedje("kaas", 36, "torchelli"), new Liedje("kkas", 36, "torchelli36")],
        artiesten: [
            new Muzikant("patat",
                new Date("2018-03-16"),
                new Adres("klaastraat", 8500, "Kortrijk", "France"),
                "blaaspijp"),
            new Zanger("zanger",
                new Date("2018-03-06"),
                new Adres("klaahhstraat", 85500, "Kuurne", "NEWZEELAND"),
                TOONHOOGTES.Tenor)
        ],
        genre: genre_2
    }));


    /* await connection.manager.save(connection.manager.create(Liedje, {
         titel: "hello world",
         duur: 300,
         writer: "mahalia jackson"
     }));*/

    console.log("Express server has started on port 3000. Open http://localhost:3000/liedjes to see results");

}).catch(error => console.log(error));
