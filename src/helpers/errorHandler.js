//Middleware for handling errors
module.exports = (err, res) => {
    const {status, data, errors} = err;
    res.status(status).json({
        status,
        data,
        errors
    });
};
