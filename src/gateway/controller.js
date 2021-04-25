//Gateway controller.js
const {body, validationResult} = require('express-validator');
const {Gateway} = require('./models');
const {ValidationError} = require("../helpers/error");
const {validateIpv4} = require("../helpers/validator");

//For index
const index = async (req, res, next) => {
    let gateways;
    try {
        //Get all gateways
        gateways = await Gateway.all();
    } catch (error) {
        //Pass the error to next middleware
        return next(error);
    }

    const status = 200;
    //Return the json data
    res.status(status).json({
        status,
        data: gateways.map(gateway => {
            return {peripherals: gateway.peripherals, ...gateway}
        })
    });
};
//For get a single gateway
const get = async (req, res, next) => {
    const {serialNumber} = req.params;

    //Get the gateway using serialNumber
    let gateway;
    try {
        gateway = await Gateway.get(serialNumber)
    } catch (err) {
        return next(err);
    }

    const status = 200;
    //Return the json data
    res.status(status).json({
        status,
        data: {peripherals: gateway.peripherals, ...gateway}
    });
};
//For create a new gateway
const add = async (req, res, next) => {
    // validate request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Pass the errors to next middleware
        return next(new ValidationError(errors.array()));
    }

    const {serialNumber, name, ipv4} = req.body;
    //Initialize the new gateway object
    const gateway = new Gateway(serialNumber, name, ipv4);

    const status = 200;
    //Return the json data
    res.status(status).json({
        status,
        data: {peripherals: gateway.peripherals, ...gateway}
    });
};
//For update a gateway
const update = async (req, res, next) => {
    // validate request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Pass the error to next middleware
        return next(new ValidationError(errors.array()));
    }

    const {serialNumber} = req.params;
    //Get the gateway using serialNumber
    let gateway;
    try {
        gateway = await Gateway.get(serialNumber)
    } catch (err) {
        return next(err);
    }

    const {name, ipv4} = req.body;

    //Update the gateway with the new values
    gateway.update(name, ipv4);

    const status = 200;
    //Return the json data
    res.status(status).json({
        status,
        data: {peripherals: gateway.peripherals, ...gateway}
    });
};
//For remove a gateway
const remove = async (req, res, next) => {
    const {serialNumber} = req.params;

    //Get the gateway using serialNumber
    let gateway;
    try {
        gateway = await Gateway.get(serialNumber);
        //Remove the gateway from the storage and they peripherals
        await gateway.remove();
    } catch (err) {
        return next(err);
    }

    const status = 200;
    //Return the json data
    res.status(status).json({
        status,
        data: gateway
    });
};
//For validate gateway fields
const validate = (method) => {

    //Validate name field
    //name must be an not empty string
    const name = body('name')
        .isString().withMessage('name field must be a valid string').bail()
        .not().isEmpty().withMessage('name field must not be empty');
    //Validate ipv4 field
    //ipv4 must be an valid IP address
    const ipv4 = body('ipv4')
        .isString().withMessage('ipv4 field must be a valid string').bail()
        .custom(value => {
            if (!validateIpv4(value)) {
                throw new Error('invalid IP address');
            }
            return true;
        });
    //Validate serialNumber field
    //serialNumber must be an unique not empty string
    const serialNumber = body('serialNumber')
        .isString().withMessage('serialNumber field must be a valid string').bail()
        .not().isEmpty().withMessage('serialNumber field must not be empty').bail()
        .custom(async serialNumber => {
            const exists = await Gateway.exists(serialNumber);

            if (!exists) {
                return true;
            }

            return Promise.reject('serialNumber field must be unique');
        });

    //By default only validate name and ivp4 fields
    const validators = [name, ipv4];

    //If are adding a new gateway, then the serialNumber field will be validate too
    if (method === 'add') {
        validators.push(serialNumber);
    }

    return validators;
};

module.exports = {
    index,
    get,
    add,
    update,
    remove,
    validate
};

