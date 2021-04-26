//Middleware for handling errors
const {BaseError} = require('./error');

module.exports = (err, res) => {

    if (!(err instanceof BaseError)) {
        throw err;
    }

    let {status, errors} = err;

    res.status(status).json({
        status,
        errors
    });
};
