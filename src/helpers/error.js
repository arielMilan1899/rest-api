class BaseError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

class DoesNotExists extends BaseError {
    constructor(object) {
        const message = `${object} does not exists`;
        const statusCode = 404;
        super(statusCode, message);
    }
}

module.exports = {
    BaseError,
    DoesNotExists
};
