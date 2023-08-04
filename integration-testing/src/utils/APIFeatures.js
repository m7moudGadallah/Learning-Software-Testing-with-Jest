/**
 * A utility class for parsing and manipulating query parameters for API features.
 */
class APIFeatures {
    #reqQuery;

    /**
     * Create an instance of APIFeatures.
     * @param {object} reqQuery - The request query object containing the query parameters.
     * @param {string[]} [excludedFields=[]] - An array of field names to be excluded from the query parameters.
     */
    constructor(reqQuery, excludedFields = []) {
        this.#reqQuery = reqQuery;
        this.excludedFields = excludedFields.length
            ? excludedFields
            : ['page', 'sort', 'limit', 'fields', 'select'];
    }

    /**
     * Parse and prepare the filter options from the request query.
     * @returns {object} The filter options object to be used in a MongoDB query.
     */
    parseFilterOptions() {
        try {
            // make a copy from reqQuery and delete excludedFields
            let queryObj = { ...this.#reqQuery };
            this.excludedFields.forEach((field) => delete queryObj[field]);

            // Match (gt|gte|lt|lte|eq|ne|in|nin)
            const queryStr = JSON.stringify(queryObj).replace(
                /\b(gt|gte|lt|lte|eq|ne|in|nin)\b/g,
                (match) => `$${match}`
            );

            // Parse the modified query string
            queryObj = JSON.parse(queryStr);

            // Convert in and nin values to arrays
            const convertValuesToArray = (subKey) => {
                Object.keys(queryObj).forEach((key) => {
                    if (queryObj[key][subKey]) {
                        queryObj[key][subKey] =
                            queryObj[key][subKey].split(',');
                    }
                });
            };

            // Convert in values to arrays
            convertValuesToArray('$in');

            // Convert in values to arrays
            convertValuesToArray('$nin');

            return queryObj;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Parse and prepare the sort options from the request query.
     * @param {string} [fields=''] - Comma-separated list of fields to sort by.
     * @returns {string} The sort options string to be used in a MongoDB query.
     */
    parseSortOptoins(fields = '') {
        try {
            let sortBy = '_id';

            if (this.#reqQuery.sort || fields) {
                sortBy = (this.#reqQuery.sort || fields).split(',').join(' ');
            }

            return sortBy;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Parse and prepare the select options from the request query.
     * @param {string} [fields=''] - Comma-separated list of fields to include in the query results.
     * @returns {string} The select options string to be used in a MongoDB query.
     */
    parseSelectOptions(fields = '') {
        try {
            let selectOptions = '-__v';

            if (this.#reqQuery.fields || this.#reqQuery.select || fields) {
                selectOptions = (
                    this.#reqQuery.fields ||
                    this.#reqQuery.select ||
                    fields
                )
                    .split(',')
                    .join(' ');
            }

            return selectOptions;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = APIFeatures;
