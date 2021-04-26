//Gateway routes.js
const {router} = require("../helpers/router");
const controller = require('./controller');


//route for get all gateways
router('/', 'get', [], controller.getAll);
//route for get a single gateway by serialNumber
router('/:serialNumber', 'get', [], controller.get);
//route for create a gateway
router('/add', 'post', controller.validate('add'), controller.add);
//route for update a gateway
router('/update/:serialNumber', 'put', controller.validate('update'), controller.update);
//route for remove a gateway
router('/remove/:serialNumber', 'delete', [], controller.remove);

//Export Gateway routes
module.exports = router.routes;