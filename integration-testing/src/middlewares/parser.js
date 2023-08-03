const { json } = require('express');
const cookieParser = require('cookie-parser');

/**
 * Middlewares
 * @middleware body-parser json
 * @middleware cookie-parser
 */
const parser = (app) => {
    // body-parser middleware => rendering data from req.body
    app.use(json());

    // cookie-parser
    app.use(cookieParser());
};

module.exports = parser;