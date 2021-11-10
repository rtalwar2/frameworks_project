import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {albumRouter, genreRouter, liedjesRouter} from "./routes";
import {router} from "./routes/index";
import {Liedje} from "./entity/Liedje";
import {Album} from "./entity/Album";
import {Adres} from "./entity/Adres";
import {Muzikant} from "./entity/Muzikant";
import {Genre} from "./entity/Genre";
import {Zanger} from "./entity/Zanger";
import {TOONHOOGTES} from "./entity/TOONHOOGTES";
import {LiedjeDAO} from "./controller/LiedjeDAO";
import * as fs from "fs";

import {WebSocketServer} from "ws"

const server = new WebSocketServer({port: 8080});

server.on('connection', socket => {
    socket.on('message', () => {
        socket.send("SOCKET KUNNEN STARTEN");
    });
});

//server ontvangt bericht
server.on('message', socket => {
    socket.on('message')
})

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(express.static(__dirname+'/statics'))

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

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

    app.get("/app", function (req, res, next) {
        let read=fs.createReadStream(__dirname+"/statics/index.html")
        read.pipe(res);
    })


    app.use("/liedjes", liedjesRouter)

    app.use("/albums", albumRouter)
    app.use("/genres", genreRouter)


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

/*
    await connection.manager.save(connection.manager.create(Genre, {
        naam: "reggae",
        origine: "Jamaica",
        albums: []
    }));
    let genre_2 = await connection.manager.findOne(Genre, "reggae");

    let muzikant1 = new Muzikant("patat",
        new Date("2018-03-16"),
        new Adres("klaastraat", 8500, "Kortrijk", "France"), "blaaspijp")
    let zanger1 = new Zanger("zanger",
        new Date("2018-03-06"),
        new Adres("klaahhstraat", 85500, "Kuurne", "NEWZEELAND"),
        "Tenor")

    await connection.manager.save(muzikant1);
    await connection.manager.save(zanger1);


    await connection.manager.save(connection.manager.create(Album, {
        titel: "SKY",
        label: "KING ARTHUR RECORDS",
        liedjes: [new Liedje("kaas", 36, "torchelli"), new Liedje("kkas", 36, "torchelli36")],
        artiesten: [muzikant1, zanger1],
        genre: genre_2
    }));
*/

    /* await connection.manager.save(connection.manager.create(Liedje, {
         titel: "hello world",
         duur: 300,
         writer: "mahalia jackson"
     }));*/

    console.log("Express server has started on port 3000. Open http://localhost:3000/liedjes to see results");

}).catch(error => console.log(error));
