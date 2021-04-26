//Peripheral controller.js
const {body, validationResult} = require('express-validator');
let {Peripheral} = require('./models');
const {ValidationError} = require("../helpers/error");
const {Gateway} = require('../gateway/models');
const {MAX_GATEWAY_PERIPHERALS} = require('../../config');

//For create a new peripheral
const add = async (req) => {
    // validate request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Pass the errors to next middleware
        throw new ValidationError(errors.array());
    }

    const {vendor, status, gatewaySerialNumber} = req.body;
    //Initialize the new peripheral object
    return Peripheral.repository.add(vendor, status, gatewaySerialNumber);
};
//For update a peripheral
const update = async (req) => {
    // validate request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Pass the errors to next middleware
        throw new ValidationError(errors.array());
    }

    const {id, vendor, status, gatewaySerialNumber} = req.body;
    //Get the peripheral using id
    let peripheral = await Peripheral.repository.get(id);

    //Update the peripheral with the new values
    await Peripheral.repository.update(peripheral, vendor, status, gatewaySerialNumber);

    return peripheral;
};
//For remove a peripheral
const remove = async (req) => {
    const {id} = req.body;

    //Get the peripheral using id
    let peripheral = await Peripheral.repository.get(id);

    //Remove the peripheral from the storage
    await Peripheral.repository.remove(peripheral);

    return 'Peripheral was successful deleted';
};
//For validate peripheral fields
const validate = () => {
    return [
        //Validate gatewaySerialNumber field
        //gatewaySerialNumber must be an not empty string
        //a gateway must exits on the storage
        //a gateway must have only 10 peripherals
        body('gatewaySerialNumber')
            .isString().withMessage('gatewaySerialNumber field must be a valid string').bail()
            .not().isEmpty().withMessage('gatewaySerialNumber field must not be empty').bail()
            .custom(async (value, {req}) => {
                let gateway;
                try {
                    gateway = await Gateway.repository.get(value)
                } catch ({errors}) {
                    throw errors;
                }

                const peripherals = gateway.peripherals;
                if (peripherals.length === MAX_GATEWAY_PERIPHERALS) {
                    const {id} = req.body;

                    if (!id || !peripherals.find(peripheral => peripheral.id === id)) {
                        return Promise
                            .reject(`A gateway must not have more than ${MAX_GATEWAY_PERIPHERALS} peripherals`);
                    }
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
