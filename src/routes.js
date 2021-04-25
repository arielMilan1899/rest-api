//routes.js
const router = require('express').Router();
const controller = require('./controller');

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

// routes
router.route('/gateway')
    .get(controller.index)
router.route('/gateway/:id')
    .get(controller.get)

//Export API routes
module.exports = router;