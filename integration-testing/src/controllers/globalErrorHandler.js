const { AppError } = require('../utils');
const { NODE_ENV: MODE } = process.env;

/**
 * Handles cast errors that occur in the database.
 * @function handleCastErrorDB
 * @param {Error} err - The cast error object.
 * @returns {AppError} - An instance of AppError with a message describing the error.
 */
const handleCastErrorDB = function (err) {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

/**
 * Handles duplicate fields errors that occur in the database.
 * @function handleDuplicateFieldsDB
 * @param {Error} err - The duplicate fields error object.
 * @returns {AppError} - An instance of AppError with a message describing the error.
 */
const handleDuplicateFieldsDB = function (err) {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0].slice(1, -1);
    const message = `Duplicate field value: ${value}, Please use another value!`;
    return new AppError(message, 400);
};

/**
 * Handles validation errors that occur in the database.
 * @function handleValidationErrorDB
 * @param {Error} err - The validation error object.
 * @returns {AppError} - An instance of AppError with a message describing the error.
 */
const handleValidationErrorDB = function (err) {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;

    return new AppError(message, 400);
};

/**
 * Sends error response in development environment.
 * @function sendErrorDev
 * @param {Error} err - The error object.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const sendErrorDev = (err, req, res) => {
    console.log(err.message.brightRed);

    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

/**
 * Sends error response in production environment.
 * @function sendErrorProd
 * @param {Error} err - The error object.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            status: err.status,
            error: err.message,
        });
    } else {
        console.error('ERROR 💥', err);

        res.status(500).json({
            success: false,
            status: 'error',
            message: 'Something went very wrong!',
        });
    }
};

/**
 * Global error handler middleware.
 * @function globalErrorHandeler
 * @param {Error} err - The error object.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const globalErrorHandeler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    if (MODE === 'development') {
        sendErrorDev(err, req, res);
    } else {
        let error = { ...err, name: err.name, message: err.message };

        // mongooses errors
        if (error.name === 'CastError') {
            error = handleCastErrorDB(error);
        } else if (error.code === 11000) {
            error = handleDuplicateFieldsDB(error);
        } else if (err.name === 'ValidationError') {
            error = handleValidationErrorDB(error);
        }

        sendErrorProd(error, req, res);
    }
};

module.exports = globalErrorHandeler;