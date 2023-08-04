const devLogger = require('./devLogger');
const parser = require('./parser');
const error = require('./error');

module.exports = (app) => {
    return {
        /**
         * Middlewares before routes
         * @middleware devLogger => Development logging
         * @middleware parser => body-parser, upload file, cookie-parser
         */
        pre() {
            // Development logging
            devLogger(app);

            // body-parser middleware
            parser(app);
        },

        /**
         * Middlewares after routes
         * @middleware error => [undefinedRoutes, globalMiddleware]
         */
        post() {
            // handles [undefinedRoutes, globalErrors]
            error(app);
        },
    };
};
