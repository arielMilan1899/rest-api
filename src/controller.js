//controller.js
let {gateways, peripherals, Gateway, Peripheral} = require('./models');

//For index
function index(req, res) {
    res.json({
        status: "success",
        data: Gateway.all()
    });
}

function get(req, res) {
    const id = res.param.id;

}

