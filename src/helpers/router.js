//Helper router to process the output of the controllers
const express = require('express');

class Router {
    constructor() {
        this.expressRouter = express.Router();
    }

    addRoute = (route, method, validators, controller) => {
        this.expressRouter.route(route)[method](
            validators,
            function (req, res, next) {
                controller(req, res, next)
                    .then(data => {
                        const status = 200;
                        //Return the json data
                        res.status(status).json({
                            status,
                            data
                        });
                    })
                    .catch(err => next(err));
            });
    };
}

const createRouter = () => {
    return new Router();
};


module.exports = {
    Router,
    createRouter
};
