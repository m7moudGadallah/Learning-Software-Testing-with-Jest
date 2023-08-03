const { default: axios } = require('axios');
const db = require('./db');
const email = require('./email');



const sum = (a, b) => a + b;

const greeting = (name) => `Hello, ${name}!`;

const animals = ['cat', 'dog', 'cow'];

const getItemById = (id) => {
    if (!id) {
        throw new Error('ID is not defined, please provide id!');
    }

    if (id < 0) {
        throw new Error('Invalid ID!');
    }

    return {
        id: id,
        price: 10,
    };
};

const getItems = async () => {
    return [
        { id: 1, price: 20 },
        { id: 2, price: 80 },
        { id: 3, price: 30 },
    ];
};

const fetchData = async () => {
    const data = await axios.get('http://example.com');
    // implementation
    return data;
};

const createOrder = async (userId, products) => {
    // check that argument passed already
    if (!userId) {
        throw new Error('userId not found');
    }

    if (!products) {
        throw new Error('products not found');
    }

    // get user from DB
    const user = await db.getUser(userId);

    if (!user) {
        throw new Error(`Not found a user with this id: ${userId}`);
    }

    // save order in DB
    await db.createOrder(userId, products);

    // calculate total price
    const totalPrice = products.reduce(
        (acc, product) => acc + product.price,
        0
    );

    // send email
    email.sendEmail(user.email, totalPrice);

    // return success message
    return `Order created successfully with totalPrice: ${totalPrice} and products: ${products}`;
};

module.exports = {
    sum,
    greeting,
    animals,
    getItemById,
    getItems,
    fetchData,
    createOrder,
};
