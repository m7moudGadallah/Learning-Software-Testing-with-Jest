/**
 * A service class for performing common operations on a MongoDB model.
 */
class Service {
    /**
     * Create a new instance of the Service.
     * @param {import('mongoose').Model} model - The Mongoose model to perform operations on.
     */
    constructor(model) {
        this.model = model;
    }

    /**
     * Count the number of documents matching the filter options.
     * @param {object} [options] - Options for the count operation.
     * @param {object} [options.filterOptions] - The filter options for the count operation.
     * @returns {Promise<number>} The number of documents matching the filter options.
     */
    async count(options = { filterOptions: {} }) {
        const numOfDocs = await this.model.countDocuments(
            options.filterOptions
        );
        return numOfDocs;
    }

    /**
     * Check if a document with the given ID exists.
     * @param {string} id - The ID of the document to check.
     * @returns {Promise<boolean>} `true` if the document exists, `false` otherwise.
     */
    async isExist(id) {
        const doc = await this.model.findById(id);
        return doc ? true : false;
    }

    /**
     * Get a list of documents based on the provided options.
     * @param {object} [options] - Options for the get operation.
     * @param {object} [options.filterOptions] - The filter options for the get operation.
     * @param {string} [options.sortOptions] - The sort options for the get operation.
     * @param {string} [options.selectOptions] - The select options for the get operation.
     * @param {number} [options.page=1] - The page number for pagination.
     * @param {number} [options.limit=100] - The maximum number of documents per page.
     * @param {string[]} [options.populates] - An array of field names to populate.
     * @returns {Promise<import('mongoose').Document[]>} An array of documents matching the criteria.
     */
    async get(
        options = {
            filterOptions: {},
            sortOptions: '',
            selectOptoins: '',
            page: 1,
            limit: 100,
            populates: [],
        }
    ) {
        try {
            const {
                filterOptions,
                sortOptions,
                selectOptions,
                page,
                limit,
                populates,
            } = options;
            const startIndex = (page - 1) * limit;

            const query = this.model
                .find(filterOptions)
                .skip(startIndex)
                .limit(limit)
                .sort(sortOptions)
                .select(selectOptions);

            // populate passed item
            if (populates) {
                populates.forEach((item) => query.populate(item));
            }

            // execute query
            const docs = await query;

            return docs;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get a single document by ID.
     * @param {string} id - The ID of the document to retrieve.
     * @param {object} [options] - Options for the getOne operation.
     * @param {string[]} [options.populates] - An array of field names to populate.
     * @returns {Promise<import('mongoose').Document|null>} The retrieved document, or `null` if not found.
     */
    async getOne(id, options = { populates: [] }) {
        const query = this.model.findById(id);

        // populate passed item
        if (options?.populates) {
            options.populates.forEach((item) => query.populate(item));
        }

        const doc = await query;

        return doc;
    }

    /**
     * Create a new document.
     * @param {object} fields - The fields of the new document.
     * @returns {Promise<import('mongoose').Document>} The newly created document.
     */
    async createOne(fields = {}) {
        const newDoc = await this.model.create(fields);

        newDoc.__v = undefined;

        return newDoc;
    }

    /**
     * Update a document by ID.
     * @param {string} id - The ID of the document to update.
     * @param {object} fields - The fields to update in the document.
     * @returns {Promise<import('mongoose').Document|null>} The updated document, or `null` if not found.
     */
    async udpateOne(id, fields = {}) {
        const doc = await this.model.findOneAndUpdate({ _id: id }, fields, {
            new: true,
            runValidators: true,
        });

        return doc;
    }

    /**
     * Delete a document by ID.
     * @param {string} id - The ID of the document to delete.
     * @returns {Promise<void>}
     */
    async deleteOne(id) {
        const doc = await this.model.findById(id);
        await doc.remove();
    }
}

module.exports = Service;
