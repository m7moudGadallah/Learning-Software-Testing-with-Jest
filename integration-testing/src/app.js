const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

// mount middleware
const middleware = middlewares(app);

// mount pre middleware
middleware.pre();

// mount routes
routes(app);

// mount post middleware
middleware.post();

module.exports = app;
