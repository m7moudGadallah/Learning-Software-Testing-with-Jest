const bookRouter = require('./bookRoutes');

module.exports = (app) => {
    app.use('/api/v1/books', bookRouter);
};
