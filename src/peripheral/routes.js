//Peripheral routes.js
const router = require('express').Router();
const controller = require('./controller');

//route for create a peripheral
router.route('/add').post(controller.validate('add'), controller.add);
//route for update a peripheral
router.route('/update/:id').put(controller.validate('update'), controller.update);
//route for remove a peripheral
router.route('/remove/:id').delete(controller.remove);

//Export Peripheral routes
module.exports = router;
