//Helper errors for api
const {MAX_GATEWAY_PERIPHERALS} = require('../../config');

class BaseError extends Error {
    constructor(status, errors) {
        super();
        this.status = status;
        this.errors = errors;
    }
}

class DoesNotExists extends BaseError {
    constructor(object) {
        const errors = `${object} does not exists`;
        const status = 404;
        super(status, errors);
    }
}

class ValidationError extends BaseError {
    constructor(errors) {
        const status = 400;
        super(status, errors)
    }
}

class UniqueConstrainError extends BaseError {
    constructor(field) {
        const errors = `${field} field must be unique`;
        const status = 500;
        super(status, errors);
    }
}

class MaxGatewayPeripheralsError extends BaseError {
    constructor() {
        const errors = `A gateway must not have more than ${MAX_GATEWAY_PERIPHERALS} peripherals`;
        const status = 500;
        super(status, errors);
    }
}

module.exports = {
    BaseError,
    DoesNotExists,
    ValidationError,
    UniqueConstrainError,
    MaxGatewayPeripheralsError,
};
