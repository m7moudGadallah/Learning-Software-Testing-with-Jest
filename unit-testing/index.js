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

module.exports = {
    sum,
    greeting,
    animals,
    getItemById,
};
