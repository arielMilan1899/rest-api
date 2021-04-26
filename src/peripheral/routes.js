//Peripheral routes.js
const router = require("../helpers/router").createRouter();
const controller = require('./controller');

//route for create a peripheral
router.addRoute('/add', 'post', controller.validate('add'), controller.add);
//route for update a peripheral
router.addRoute('/update/:id', 'put', controller.validate('update'), controller.update);
//route for remove a peripheral
router.addRoute('/remove/:id', 'delete', [], controller.remove);

//Export Peripheral routes
module.exports = router.expressRouter;
