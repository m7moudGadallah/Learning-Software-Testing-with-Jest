const bookController = require('./bookController');
const globalErrorHandler = require('./globalErrorHandler');
const undefinedRoutesHandler = require('./undefinedRoutesHandler');

module.exports = {
    bookController,
    errorController: {
        globalErrorHandler,
        undefinedRoutesHandler,
    },
};
