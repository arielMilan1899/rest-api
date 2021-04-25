//Gateway controller.js
const {body, validationResult} = require('express-validator');
let {Gateway} = require('./models');
const {ValidationError} = require("../helpers/error");
const {validateIpv4} = require("../helpers/validator");

//For index
const index = async (req, res, next) => {
    let gateways;
    try {
        gateways = await Gateway.all();
    } catch (error) {
        return next(error);
    }

    const status = 200;
    res.status(status).json({
        status,
        data: gateways
    });
};
//For get a single gateway
const get = async (req, res, next) => {
    const serialNumber = req.params.serialNumber;
    let gateway;

    try {
        gateway = await Gateway.get(serialNumber)
    } catch (err) {
        return next(err);
    }

    const status = 200;
    res.status(status).json({
        status,
        data: gateway
    });
};
//For create a new gateway
const add = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new ValidationError(errors.array()));
    }

    const {serialNumber, name, ipv4} = req.body;
    const gateway = new Gateway(serialNumber, name, ipv4);

    const status = 200;
    res.status(status).json({
        status,
        data: gateway
    });
};
//For remove a gateway
const remove = async (req, res, next) => {
    const serialNumber = req.params.serialNumber;
    let gateway;

    try {
        gateway = await Gateway.get(serialNumber);
        await gateway.remove();
    } catch (err) {
        return next(err);
    }
    const status = 200;
    res.status(status).json({
        status,
        data: gateway
    });
};
//For validate gateway fields
const validate = (method) => {
    switch (method) {
        case 'add': {
            return [
                body('serialNumber')
                    .isString().withMessage('serialNumber field must not be empty').bail()
                    .not().isEmpty().withMessage('serialNumber field must not be empty').bail()
                    .custom(async value => {
                        try {
                            await Gateway.get(value);
                        } catch (err) {
                            return true;
                        }
                        return Promise.reject('serialNumber field must be unique');
                    }),
                body('name')
                    .isString().withMessage('name field must be a valid string').bail()
                    .not().isEmpty().withMessage('name field must not be empty'),
                body('ipv4')
                    .isString().withMessage('ipv4 field must be a valid string').bail()
                    .custom(value => {
                        if (!validateIpv4(value)) {
                            throw new Error('invalid IP address');
                        }
                        return true;
                    }),
            ]
        }
    }
};

module.exports = {
    index,
    get,
    add,
    remove,
    validate
};

