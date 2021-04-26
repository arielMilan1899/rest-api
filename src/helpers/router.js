//Helper router to process the output of the controllers
const expressRouter = require('express').Router();

const router = (route, method, validators, controller) => {
    expressRouter.route(route)[method](
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

router.routes = expressRouter;

module.exports = {
    router
};
