//Gateway routes.js
const router = require('express').Router();
const controller = require('./controller');

//route for get all gateways
router.route('/').get(controller.index);
//route for get a single gateway by serialNumber
router.route('/:serialNumber').get(controller.get);
//route for create a gateway
router.route('/add').post(controller.validate('add'), controller.add);
//route for update a gateway
router.route('/update/:serialNumber').put(controller.validate('update'), controller.update);
//route for remove a gateway
router.route('/remove/:serialNumber').delete(controller.remove);

//Export Gateway routes
module.exports = router;