//Gateway routes.js
const router = require('express').Router();
const controller = require('./controller');

//route for get all gateways
router.route('/')
    .get(controller.index);
//route for get a single gateway by id
router.route('/:id')
    .get(controller.get);

//Export Gateway routes
module.exports = router;