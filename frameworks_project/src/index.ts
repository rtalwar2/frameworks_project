import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {albumRouter, genreRouter, liedjesRouter} from "./routes";
import {Liedje} from "./entity/Liedje";
import {Album} from "./entity/Album";
import {Adres} from "./entity/Adres";
import {Muzikant} from "./entity/Muzikant";
import {Genre} from "./entity/Genre";
import {Zanger} from "./entity/Zanger";
import {TOONHOOGTES} from "./entity/TOONHOOGTES";
import {LiedjeDAO} from "./controller/LiedjeDAO";

var fs = require('fs');
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
        wss.clients.forEach(function each(client) {
            if (client !== ws) {
                if(data == "update"){
                    client.send("update");
                } else if (data.includes("update_specific")){
                    client.send(data.toString());
                }
            }
        });
    });
});




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

    app.use("/liedjes", liedjesRouter)
    app.use("/albums", albumRouter)
    app.use("/genres", genreRouter)
    app.use(function(req,res,next){
        let err = new Error('Dat pad bestaat niet!');
        res.status(404);
        next(err);
        });
    app.use(errorHandler)


    function errorHandler (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error =
            req.app.get('env') === 'development' ? err : {};
        res.status(404);
        res.send("oeps... er ging iets mis ಥ_ಥ")
    }
    module.exports = app;

    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://193.191.169.108:3000/ to see results");

}).catch(error => console.log(error));
