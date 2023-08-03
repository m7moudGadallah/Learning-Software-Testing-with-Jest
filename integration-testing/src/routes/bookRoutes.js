const router = require('express').Router();
const { bookController } = require('../controllers');

router
    .route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createBook);

router
    .route('/:id')
    .get(bookController.getBook)
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook);

module.exports = router;
