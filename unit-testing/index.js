const sum = (a, b) => a + b;

const greeting = (name) => `Hello, ${name}!`;

const animals = ['cat', 'dog', 'cow'];

const getItemById = (id) => {
    return {
        id: id,
        price: 10,
    };
};

module.exports = {
    sum,
    greeting,
    animals,
    getItemById,
};
