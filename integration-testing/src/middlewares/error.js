const { errorController } = require('../controllers');

/**
 * Middelwares
 * @middelware undefinedRoutes
 * @middelware globalMiddleware
 */
const error = (app) => {
    // handle undefined routes
    app.all('*', errorController.undefinedRoutesHandler);

    // global error middleware
    app.use(errorController.globalErrorHandler);
};

module.exports = error;
