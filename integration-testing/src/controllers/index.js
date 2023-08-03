const globalErrorHandler = require('./globalErrorHandler');
const undefinedRoutesHandler = require('./undefinedRoutesHandler');

module.exports = {
    errorController: {
        globalErrorHandler,
        undefinedRoutesHandler
    }
};
