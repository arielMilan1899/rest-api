//controller.js
let {gateways, peripherals, Gateway, Peripheral} = require('./models');

//For index
const index = async (req, res, next) => {
    let gateways;
    try {
        gateways = await Gateway.all();
    } catch (error) {
        return next(error);
    }

    res.status(200).json(gateways);
};

const get = async (req, res, next) => {
    const id = req.params.id;
    let gateway;

    try {
        gateway = await Gateway.get(id)
    } catch (err) {
        return next(err);
    }

    res.status(200).json(gateway);
};

module.exports = {
    index,
    get,
};

