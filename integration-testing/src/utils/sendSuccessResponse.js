/**
 * A utility function to send a success response with optional token attachment and JSON data.
 *
 * @function sendSuccessResponse
 * @param {Object} options - The options for the success response.
 * @param {Object} options.response - The Express response object.
 * @param {number} [options.statusCode=200] - The HTTP status code for the response (default is 200).
 * @returns {Object} - An object with two methods: `attachTokenCookie` and `JSON`.
 *
 * @example
 * // Example usage:
 * const options = {
 *     response: res,
 *     statusCode: 200,
 * };
 * const responseSender = sendSuccessResponse(options);
 *
 * // Attach token cookie (optional):
 * responseSender.attachTokenCookie('your-token-goes-here', expiresNow= false);
 *
 * // Send JSON response:
 * responseSender.JSON({
 *     pagination: {
 *         next: { page: 3, pageSize: 10 },
 *         prev: { page: 1, pageSize: 20 }
 *     },
 *     data: { name: 'John', age: 30 },
 *     count: 1,
 * });
 */
const sendSuccessResponse = function (options = { response, statusCode }) {
    const { response, statusCode = 200 } = options;
    response.status(statusCode);

    return {
        /**
         * Attaches a JWT token as a cookie to the response object with the specified options.
         *
         * @function attachTokenCookie
         * @param {string} token - The JWT token to be attached as a cookie.
         * @param {boolean} expiresNow - it's false by default so set it to true, if you use this token to logout
         * @returns {Object} - The updated `sendSuccessResponse` object with the `attachTokenCookie` method.
         *
         * @example
         * // Example usage:
         * const options = {
         *     response: res,
         *     statusCode: 200,
         * };
         */
        attachTokenCookie(token, expiresNow = false) {
            // cookie options
            console.log(token);
            const { JWT_COOKIE_EXPIRES_IN: expiresIn, NODE_ENV: MODE } =
                process.env;

            const options = {
                expires: new Date(
                    Date.now() +
                        (expiresNow ? 0 : expiresIn * 24 * 60 * 60 * 1000)
                ),
                httpOnly: true,
            };

            if (MODE === 'production') {
                options.secure = true;
            }

            response.cookie('jwt', token, options);
            return this;
        },

        /**
         * Sends a JSON response with the specified status code, data, and message.
         * @function JSON
         * @param {object} options - The options for the JSON response.
         * @param {string} token - The JWT token.
         * @param {object} [options.data] - The data to be included in the response.
         * @param {number} [options.count] - The number of data items in the response.
         * @example
            const options = {
            response: res,
            statusCode: 200,
            data: { name: 'John', age: 30 },
            count: 1
            };
            JSON(options);
        */
        JSON(options = { token, pagination, data, count }) {
            const { token, pagination, data, count } = options;

            response.status(statusCode).json({
                success: true,
                token,
                count,
                pagination,
                data,
            });
        },
    };
};

module.exports = sendSuccessResponse;
