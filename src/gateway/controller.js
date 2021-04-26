//Gateway controller.js
const {body, validationResult} = require('express-validator');
const {Gateway} = require('./models');
const {ValidationError} = require("../helpers/error");
const {validateIpv4} = require("../helpers/validator");

//For get a single gateway
const get = async (req) => {
    const {serialNumber} = req.body;

    // If serialNumber is passed then will only return a single gateway
    if (serialNumber) {
        //Get the gateway using serialNumber
        const gateway = await Gateway.repository.get(serialNumber);
        return {...gateway, peripherals: gateway.peripherals};
    }

    // If serialNumber is not passed then will return all gateways
    //Get all gateways from storage
    const gateways = await Gateway.repository.all();

    return gateways.map(gateway => {
        return {...gateway, peripherals: gateway.peripherals};
    });

};
//For create a new gateway
const add = async (req) => {
    // validate request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Pass the errors to next middleware
        throw new ValidationError(errors.array());
    }

    const {serialNumber, name, ipv4} = req.body;
    //Initialize the new gateway object
    const gateway = await Gateway.repository.add(serialNumber, name, ipv4);

    return {...gateway, peripherals: gateway.peripherals};
};
//For update a gateway
const update = async (req) => {
    // validate request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Pass the error to next middleware
        throw new ValidationError(errors.array());
    }

    const {serialNumber, name, ipv4} = req.body;
    //Get the gateway using serialNumber
    let gateway = await Gateway.repository.get(serialNumber);

    //Update the gateway with the new values
    await Gateway.repository.update(gateway, name, ipv4);

    return {...gateway, peripherals: gateway.peripherals};
};
//For remove a gateway
const remove = async (req) => {
    const {serialNumber} = req.body;

    //Get the gateway using serialNumber
    let gateway = await Gateway.repository.get(serialNumber);

    //Remove the gateway from the storage
    await Gateway.repository.remove(gateway);

    return 'Gateway was successful deleted';
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
            const exists = await Gateway.repository.exists(serialNumber);

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
    get,
    add,
    update,
    remove,
    validate
};

