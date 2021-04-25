//Middleware for handling errors
module.exports = (err, res) => {
    const {statusCode, message} = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};
