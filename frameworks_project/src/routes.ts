import {UserController} from "./controller/UserController";
import {LiedjeDAO} from "./controller/LiedjeDAO";

/*export const Routes = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    },
    {
        method: "get",
        route: "/liedjes",
        controller: LiedjeDAO,
        action: "get_all"
    },

    {
        method: "post",
        route: "/liedjes",
        controller: LiedjeDAO,
        action: "insert"
    }
];*/

import * as express from "express";
import * as console from "console";

export let liedjesRouter = express.Router();



liedjesRouter.route('/')
    .get(function (req, res, next) {
        let dao = new LiedjeDAO();
        const result = dao.get_all(req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
        res.end();
    })
    .post(function (req, res, next) {
        let dao = new LiedjeDAO();
        const result = dao.insert(req, res, next);
        if (result instanceof Promise) {
            result.then(result => {
                if (result !== null && result !== undefined) {
                    //console.log(result.id)
                    let url ="http://"+ req.headers.host + req.originalUrl + "/" + result.id
                    res.header("Location", url)
                    res.send(result)
                } else {
                    undefined
                }
            });

        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
        res.end();
    })
liedjesRouter.get('/search',function (req, res, next) {
    let dao = new LiedjeDAO();
    const result = dao.search_titel(req, res, next);
    if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
    res.end();
})

liedjesRouter.route('/:id')
    .get(function (req, res, next) {
        let dao = new LiedjeDAO();
        const result = dao.get_one(req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
        res.end();
    })
    .delete(function (req, res, next) {
        let dao = new LiedjeDAO();
        const result = dao.remove(req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
        } else if (result !== null && result !== undefined) {
            res.json(result);
        } else {
            res.send(result)///////////HIER EEN ERROR OPGOOIEN
        }
        res.end();
    }).put(function (req, res, next) {
    let dao = new LiedjeDAO();
    const result = dao.update(req, res, next);
    if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
    res.end();
})




