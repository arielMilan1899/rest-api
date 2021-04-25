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

module.exports = {
    BaseError,
    DoesNotExists,
    ValidationError
};
