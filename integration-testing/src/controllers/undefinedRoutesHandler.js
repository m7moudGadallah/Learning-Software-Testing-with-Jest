const { AppError } = require('../utils');

const undefinedRoutesHandler = function (req, res, next) {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

module.exports = undefinedRoutesHandler;