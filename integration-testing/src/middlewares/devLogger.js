const morgan = require('morgan');
const { NODE_ENV: MODE } = process.env;

/**
 * Middleware - logs requested endpoint on dev mode
 */
const devLogger = (app) => {
    // Development logging
    if (MODE === 'development') {
        app.use(morgan('dev'));
    }
};

module.exports = devLogger;