const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        default: 0,
    },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
