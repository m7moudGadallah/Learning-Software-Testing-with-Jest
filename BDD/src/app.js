const isPositiveNumber = (num) => {
    if (!num)   return 'zero';
    return (num > 0) ? 'positive' : 'negative';
};

module.exports = { isPositiveNumber };
