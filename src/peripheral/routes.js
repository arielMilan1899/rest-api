//Peripheral routes.js
const router = require("../helpers/router").createRouter();
const controller = require('./controller');

//route for create a peripheral
router.addRoute('/add', 'post', controller.validate(), controller.add);
//route for update a peripheral
router.addRoute('/update', 'put', controller.validate(), controller.update);
//route for remove a peripheral
router.addRoute('/remove', 'delete', [], controller.remove);

//Export Peripheral routes
module.exports = router.expressRouter;
