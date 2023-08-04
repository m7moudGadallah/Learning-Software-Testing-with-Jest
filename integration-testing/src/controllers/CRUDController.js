const {
    catchAsync,
    AppError,
    APIFeatures,
    sendSuccessResponse,
} = require('../utils');
const Service = require('./Service');

/**
 * A controller class that handles CRUD operations for a given model.
 */
class CRUDController {
    /**
     * Create a CRUDController instance.
     * @param {Model} model - The model for which CRUD operations will be performed.
     * @param {object} options - Additional options.
     * @param {string} options.docName - The name of the document.
     */
    constructor(model, options = { docName }) {
        this.model = model;
        this.service = new Service(model);
        this.docName = options.docName;
    }

    /**
     * Get all documents.
     * @param {object} options - Options for querying documents.
     * @param {string} options.sortByFields - Fields to sort by.
     * @param {string} options.selectedFields - Fields to select.
     * @param {number} options.page - Page number.
     * @param {number} options.limit - Number of documents per page.
     * @param {Array<string>} options.populates - Fields to populate.
     * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
     */
    getAll(
        options = {
            sortByFields: '',
            selectedFields: '',
            page: 1,
            limit: 100,
            populates: [],
        }
    ) {
        const createPagination = (page, limit, total) => {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const pagination = {};

            // fill pagination object
            if (endIndex < total) {
                pagination.next = {
                    page: page + 1,
                    pageSize: limit,
                };
            }

            if (startIndex > 0) {
                pagination.prev = {
                    page: page - 1,
                    pageSize: limit,
                };
            }

            return pagination;
        };

        return catchAsync(async (req, res, next) => {
            const { sortByFields, selectedFields, page, limit, populates } =
                options;

            // parse query object
            const apiFeatures = new APIFeatures(req.query);
            const filterOptions = apiFeatures.parseFilterOptions();
            const sortOptions = apiFeatures.parseSortOptoins(sortByFields);
            const selectOptions = apiFeatures.selectOptions(selectedFields);

            const countDocs = await this.service.countDocs(filterOptions);
            const docs = await this.service.get({
                filterOptions,
                sortOptions,
                selectOptions,
                page,
                limit,
                populates,
            });
            const pagination = createPagination(page, limit, countDocs);

            sendSuccessResponse({ response: res }).JSON({
                count: docs.length,
                pagination,
                data: docs,
            });
        });
    }

    /**
     * Get a single document by ID.
     * @param {object} options - Options for querying the document.
     * @param {Array<string>} options.populates - Fields to populate.
     * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
     */
    getOne(options = { populates: [] }) {
        return catchAsync(async (req, res, next) => {
            const doc = await this.service.getOne(
                req.params.id,
                options.populates
            );

            if (!doc) {
                return next(
                    new AppError(`No ${this.docName} found with that ID`, 404)
                );
            }

            sendSuccessResponse({ response: res }).JSON({
                data: doc,
            });
        });
    }

    /**
     * Create a new document.
     * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
     */
    createOne() {
        return catchAsync(async (req, res, next) => {
            const newDoc = await this.service.createOne(req.body);

            sendSuccessResponse({ response: res }).JSON({
                data: newDoc,
            });
        });
    }

    /**
     * Update an existing document by ID.
     * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
     */
    updateOne() {
        return catchAsync(async (req, res, next) => {
            const newDoc = await this.service.udpateOne(
                req.params.id,
                req.body
            );

            if (!newDoc) {
                return next(
                    new AppError(`No ${this.docName} found with that ID`, 404)
                );
            }

            sendSuccessResponse({ response: res }).JSON({
                data: newDoc,
            });
        });
    }

    /**
     * Delete a document by ID.
     * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
     */
    deleteOne() {
        return catchAsync(async (req, res, next) => {
            const isExist = await this.service.isExist(req.params.id);

            if (!isExist) {
                return next(
                    new AppError(`No ${this.docName} found with that ID`, 404)
                );
            }

            await this.service.deleteOne(req.params.id);

            sendSuccessResponse({ response: res }).JSON({
                data: null,
            });
        });
    }
}

module.exports = CRUDController;
