import {LiedjeDAO} from "./controller/LiedjeDAO";
import * as express from "express";
import {AlbumDAO} from "./controller/AlbumDAO";
import {GenreDAO} from "./controller/GenreDAO";
import * as console from "console";

export let liedjesRouter = express.Router();


liedjesRouter.route('/')
    .get(function (req, res, next) {
        let dao = new LiedjeDAO();
        const result = dao.get_all(req, res, next);
        if (result instanceof Promise) {
            result.then(result => {
                if (result !== null && result !== undefined) {
                    res.send(result)
                } else {
                    next()
                }
            }).catch((err) => {

                res.end()
            });
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    })
    .post(function (req, res, next) {
        let dao = new LiedjeDAO();
        const result = dao.insert(req, res, next);
        if (result instanceof Promise) {
            result.then(result => {
                if (result !== null && result !== undefined) {
                    //console.log(result.id)
                    let url = "http://" + req.headers.host + req.originalUrl + "/" + result.id
                    res.header("Location", url)
                    res.send(result)
                } else {
                    next()
                }
            });

        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    })
liedjesRouter.get('/search', function (req, res, next) {
    let dao = new LiedjeDAO();
    const result = dao.search_titel(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {
                next()
            }
        }).catch((err) => {

            res.end()
        });
    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
})

liedjesRouter.route('/:id')
    .get(function (req, res, next) {
        let dao = new LiedjeDAO();
        const result = dao.get_one(req, res, next);
        if (result instanceof Promise) {
            result.then(result => {
                if (result !== null && result !== undefined) {
                    res.send(result)
                } else {
                    next()
                }
            }).catch((err) => {

                res.end()
            });
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    })
    .delete(function (req, res, next) {
        let dao = new LiedjeDAO();
        const result = dao.remove(req, res, next);
        if (result instanceof Promise) {
            result.then(result => {
                if (result !== null && result !== undefined) {
                    res.send(result)
                } else {
                    res.status(204).send()
                }
            }).catch((err) => {
                res.end()
            });
        }
    }).put(function (req, res, next) {
    let dao = new LiedjeDAO();
    const result = dao.update(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {
                next()
            }
        }).catch((err) => {
            res.end()
        });
    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
})


export let albumRouter = express.Router();

albumRouter.get('/', function (req, res, next) {
    let dao = new AlbumDAO();
    const result = dao.all(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {

                next()
            }
        }).catch((err) => {

            res.end()
        });
    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
})

albumRouter.post("/", function (req, res, next) {
    let dao = new AlbumDAO();
    const result = dao.insert(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            //  console.log("ik geraak hier")
            if (result !== null && result !== undefined) {
                //console.log(result.id)
                if (result.id != undefined) {
                    let url = "http://" + req.headers.host + req.originalUrl + "/" + result.id
                    res.header("Location", url)
                }
                res.send(result)
            } else {

                next()

            }
        }).catch((err) => {
            console.log("error")
            res.end();
        });

    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
})


albumRouter.delete('/:id', function (req, res, next) {
    let dao = new AlbumDAO();
    const result = dao.remove(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {
                res.status(204).send()
            }
        }).catch((err) => {
            res.end()
        });
    }
})

albumRouter.put('/:id/add', function (req, res, next) {
    let dao = new AlbumDAO();
    const result = dao.addSongs(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {
                next()
            }
        }).catch((err) => {
            res.end()
        });
    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
})

albumRouter.put('/:id/add_artist', function (req, res, next) {
    let dao = new AlbumDAO();
    const result = dao.addArtists(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {
                next()
            }
        }).catch((err) => {

            res.end()
        });
    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
})


albumRouter.get('/search', function (req, res, next) {
    let dao = new AlbumDAO();
    const result = dao.search_titel(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {
                next()
            }
        }).catch((err) => {

            res.end()
        });
    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
})


albumRouter.get('/:id', function (req, res, next) {
    let dao = new AlbumDAO();
    const result = dao.one(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {
                next()
            }
        }).catch((err) => {
            res.end()
        });
    } else if (result !== null && result !== undefined) {
        console.log("nee sorry ik zit hier")
        res.json(result);
    }
})


//////////////////////////////////////////////////////////
export let genreRouter = express.Router();

genreRouter.get('/', function (req, res, next) {
    let dao = new GenreDAO();
    const result = dao.all(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {
                next()
            }
        }).catch((err) => {

            res.end()
        });
    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
})

genreRouter.get('/:naam', function (req, res, next) {
    let dao = new GenreDAO();
    const result = dao.one(req, res, next);
    if (result instanceof Promise) {
        result.then(result => {
            if (result !== null && result !== undefined) {
                res.send(result)
            } else {
                next()
            }
        }).catch((err) => {

            res.end()
        });
    } else if (result !== null && result !== undefined) {
        res.json(result);
    }
});



