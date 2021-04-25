//Peripheral controller.js
const {body, validationResult} = require('express-validator');
let {Peripheral} = require('./models');
const {ValidationError} = require("../helpers/error");
const {Gateway} = require('../gateway/models');

//For create a new peripheral
const add = async (req, res, next) => {
    // validate request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Pass the errors to next middleware
        return next(new ValidationError(errors.array()));
    }

    const {vendor, status, gatewaySerialNumber} = req.body;
    //Initialize the new peripheral object
    const peripheral = new Peripheral(vendor, status, gatewaySerialNumber);

    const statusCode = 200;
    //Return the json data
    res.status(statusCode).json({
        status: statusCode,
        data: peripheral
    });
};
//For update a peripheral
const update = async (req, res, next) => {
    // validate request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Pass the errors to next middleware
        return next(new ValidationError(errors.array()));
    }

    const id = req.params.id;
    let peripheral;

    try {
        //Get the peripheral using id
        peripheral = await Peripheral.get(id);
    } catch (err) {
        return next(err);
    }

    const {vendor, status, gatewaySerialNumber} = req.body;
    //Update the peripheral with the new values
    peripheral.update(vendor, status, gatewaySerialNumber);

    const statusCode = 200;
    //Return the json data
    res.status(statusCode).json({
        status: statusCode,
        data: peripheral
    });
};
//For remove a peripheral
const remove = async (req, res, next) => {
    const id = req.params.id;
    let peripheral;

    try {
        //Get the gateway using id
        peripheral = await Peripheral.get(id);
        //Remove the peripheral from the storage
        await peripheral.remove();
    } catch (err) {
        return next(err);
    }

    const status = 200;
    //Return the json data
    res.status(status).json({
        status,
        data: peripheral
    });
};
//For validate peripheral fields
const validate = (method) => {
    return [
        //Validate gatewaySerialNumber field
        //gatewaySerialNumber must be an not empty string
        //a gateway must exits on the storage
        //a gateway must have only 10 peripherals
        body('gatewaySerialNumber')
            .isString().withMessage('gatewaySerialNumber field must be a valid string').bail()
            .not().isEmpty().withMessage('gatewaySerialNumber field must not be empty').bail()
            .custom(async value => {

                try {
                    await Gateway.get(value)
                } catch ({errors}) {
                    throw errors;
                }

                if (method === 'add' && gateway.peripherals.length === 10) {
                    return Promise.reject('A gateway must not have more than 10 peripherals');
                }
                return true;
            }),
        //Validate vendor field
        //vendor must be an not empty string
        body('vendor')
            .isString().withMessage('vendor field must be a valid string').bail()
            .not().isEmpty().withMessage('vendor field must not be empty'),
        //Validate status field
        //status must be 'online' or 'offline'
        body('status')
            .isIn(['online', 'offline']),
    ]
};

module.exports = {
    add,
    update,
    remove,
    validate
};
