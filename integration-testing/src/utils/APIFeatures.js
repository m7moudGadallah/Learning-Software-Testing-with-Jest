/**
 * APIFeatures class for handling advanced querying and filtering of database queries.
 * @class APIFeatures
 * @param {object} reqQuery - The request query object.
 * @param {object} model - The database model.
 * @param {string[]} [excludedFields=[]] - The fields to be excluded from the query.
 */
class APIFeatures {
    #reqQuery;
    #resQuery;

    /**
     * Create an instance of the APIFeatures class.
     * @constructor
     * @param {object} reqQuery - The request query object.
     * @param {object} model - The database model.
     * @param {string[]} [excludedFields=[]] - The fields to be excluded from the query.
     */
    constructor(reqQuery, model, excludedFields = []) {
        this.#reqQuery = reqQuery;
        this.excludedFields = excludedFields.length
            ? excludedFields
            : ['page', 'sort', 'limit', 'fields', 'select'];
        this.#resQuery = model;
    }

    /**
     * Get the current query.
     * @member {object} query
     * @readonly
     */
    get query() {
        return this.#resQuery;
    }

    /**
     * Filter the query based on the request query parameters.
     * @function filter
     * @param {Array} [populates=[]] - The array of fields to populate in the document.
     * @returns {APIFeatures} - The updated APIFeatures instance.
     */
    filter(populates = []) {
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

            this.#resQuery = this.#resQuery.find(queryObj);

            // populate with passed items
            populates.forEach((item) => this.#resQuery.populate(item));

            return this;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Sort the query based on the request query parameters or provided fields.
     * @function sort
     * @param {string} fields - The fields to sort by. Use the following format: "field1,field2,-field3" (e.g., "id,-name") where a prefix of '-' indicates descending order.
     * @returns {APIFeatures} - The updated APIFeatures instance.
     */
    sort(fields = '') {
        try {
            if (this.#reqQuery.sort || fields) {
                const sortBy = (this.#reqQuery.sort || fields)
                    .split(',')
                    .join(' ');
                this.#resQuery = this.#resQuery.sort(sortBy);
            } else {
                this.#resQuery = this.#resQuery.sort('_id');
            }

            return this;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Select the fields to include in the query response.
     * @function select
     * @param {string} fields - The fields to include. Use the following format: "field1, field2, -field3" (e.g., "id, name, -password") where a prefix of '-' indicates the field should be excluded from the query result.
     * @returns {APIFeatures} - The updated APIFeatures instance.
     */
    select(fields = '') {
        try {
            if (this.#reqQuery.fields || this.#reqQuery.select || fields) {
                const _fields = (
                    this.#reqQuery.fields ||
                    this.#reqQuery.select ||
                    fields
                )
                    .split(',')
                    .join(' ');
                this.#resQuery = this.#resQuery.select(_fields);
            } else {
                this.#resQuery = this.#resQuery.select('-__v');
            }

            return this;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Paginate the query results.
     * @function paginate
     * @param {number} [page=1] - The page number. Default is 1.
     * @param {number} [limit=100] - The number of items per page. Default is 100.
     * @param {object} pagination - An object to store pagination data.
     * @param {number} total - The total number of documents in the entire query (not just the current page).
     * @returns {APIFeatures} - The updated APIFeatures instance.
     */
    paginate(page = 1, limit = 100, pagination, total) {
        try {
            const _page = +this.#reqQuery.page || page;
            const _limit = +this.#reqQuery.limit || limit;
            const startIndex = (_page - 1) * _limit;
            const endIndex = _page * _limit;
            this.#resQuery = this.#resQuery.skip(startIndex).limit(_limit);

            if (pagination && total) {
                // fill pagination object
                if (endIndex < total) {
                    pagination.next = {
                        page: _page + 1,
                        pageSize: _limit,
                    };
                }

                if (startIndex > 0) {
                    pagination.prev = {
                        page: _page - 1,
                        pageSize: _limit,
                    };
                }
            }

            return this;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = APIFeatures;