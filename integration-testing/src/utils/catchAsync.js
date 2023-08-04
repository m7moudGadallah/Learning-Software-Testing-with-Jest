/**
 * Wraps an asynchronous function to catch any errors and pass them to the next error-handling middleware.
 * @function catchAsync
 * @param {function} fn - The asynchronous function to be wrapped.
 * @returns {function} - A function that takes the request, response, and next middleware function as arguments.
 * @example
    const asyncFunction = async (req, res) => {
    // Async code here
    };
    app.get('/route', catchAsync(asyncFunction));
*/
const catchAsync = function (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};

module.exports = catchAsync;
