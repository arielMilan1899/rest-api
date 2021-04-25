//Middleware for handling errors
module.exports = (err, res) => {
    const {status, errors} = err;
    res.status(status).json({
        status,
        errors
    });
};
