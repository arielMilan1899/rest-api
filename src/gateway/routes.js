//Gateway routes.js
const router = require("../helpers/router").createRouter();
const controller = require('./controller');


//route for get gateways.
router.addRoute('/', 'get', [], controller.get);
//route for create a gateway
router.addRoute('/add', 'post', controller.validate('add'), controller.add);
//route for update a gateway
router.addRoute('/update', 'put', controller.validate('update'), controller.update);
//route for remove a gateway
router.addRoute('/remove', 'delete', [], controller.remove);

//Export Gateway routes
module.exports = router.expressRouter;