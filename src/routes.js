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
    .post(controller.add);
router.route('/gateway/:id')
    .get(controller.view)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete);

//Export API routes
module.exports = router;