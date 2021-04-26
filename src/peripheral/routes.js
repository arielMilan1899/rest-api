//Peripheral routes.js
const {router} = require("../helpers/router");
const controller = require('./controller');

//route for create a peripheral
router('/add', 'post', controller.validate('add'), controller.add);
//route for update a peripheral
router('/update/:id', 'put', controller.validate('update'), controller.update);
//route for remove a peripheral
router('/remove/:id', 'delete', [], controller.remove);

//Export Peripheral routes
module.exports = router.routes;
