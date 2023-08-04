const { Book } = require('../models');
const CRUDController = require('./CRUDController');

const controller = new CRUDController(Book);
/**
 * @route GET /api/v1/books
 * @desc Get all books from the database and send a success response with the books data.
 * @access public
 */
const getAllBooks = controller.getAll();

/**
 * @route GET /api/v1/books/:id
 * @desc Get a single book by id from the database and send a success response with the book data.
 * @access public
 */
const getBook = controller.getOne();

/**
 * @route POST /api/v1/books
 * @desc Create a new Book and insert it in database and send a success response with the book data.
 * @access public
 */
const createBook = controller.createOne();

/**
 * @route POST /api/v1/books/:id
 * @desc Update a Book by Id in database and send a success response with the book data.
 * @access public
 */
const updateBook = controller.updateOne();

/**
 * @route POST /api/v1/books/:id
 * @desc Delete Book from database and send a success response
 * @access public
 */
const deleteBook = controller.deleteOne();

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};
