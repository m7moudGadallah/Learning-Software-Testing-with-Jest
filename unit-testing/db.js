const getOrder = (orderId) => {
    return { id: orderId, price: 100 };
};

const updateOrder = (order) => {
    console.log('order updated successfully!');
    return order;
};

const getUser = (userId) => {
    if (userId < 5) {
        return {
            id: userId,
            name: 'example',
            email: 'example@gmail.com',
        };
    }
};

const createOrder = (userId, products) => {
    console.log('Order created Successfully');
};

module.exports = {
    getOrder,
    updateOrder,
    getUser,
    createOrder,
};
