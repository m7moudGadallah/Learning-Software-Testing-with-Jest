# Unit Testing

<!-- TOC -->

-   [Unit Testing](#unit-testing)
    -   [Introduction](#introduction)
        -   [Advantages](#advantages)
        -   [Disadvantages](#disadvantages)
    -   [Testing withJest](#testing-withjest)
        -   [Numbers](#numbers)
            -   [Matchers](#matchers)
        -   [Strings](#strings)
            -   [Matchers](#matchers)
        -   [Arrays](#arrays)
            -   [Matchers](#matchers)
        -   [Objects](#objects)
            -   [Matchers](#matchers)
        -   [Errors](#errors)
            -   [Matchers](#matchers)
        -   [Async Code](#async-code)
            -   [Matchers](#matchers)
        -   [Mocking](#mocking)
            -   [How to mock a function](#how-to-mock-a-function)
            -   [Mocking module](#mocking-module)

<!-- /TOC -->

## Introduction

> Unit Testing used to test unit of your app without its external dependencies

### Advantages

-   easy to write
-   Excute Fast

### Disadvantages

-   Don't give a lot of Confidence

**_[&uarr;top](#content)_**

## Testing withJest

### Numbers

#### Matchers

-   toBe
-   toEqual
-   toBeCloseTo
-   toBeGreaterThan
-   toBeGreaterThanOrEqual
-   toBeLessThan
-   toBeLessThanOrEqual

**_Example_**

```js
// index.js
const sum = (a, b) => a + b;
```

```js
// index.test.js
describe('sum', () => {
    it('should be 5 for 2 + 3', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(2, 3)).toEqual(5);
    });

    it('should be close to 3.5 for 2 + 1.502', () => {
        expect(sum(2, 1.502)).toBeCloseTo(3.5);
    });
});
```

**_[&uarr;top](#content)_**

### Strings

#### Matchers

-   toBe
-   toMatch

**_Example_**

```js
// index.js
const greeting = (name) => `Hello, ${name}!`;
```

```js
// index.test.js

describe('greeting', () => {
    it('should return Hello, mahmoud! for mahamoud', () => {
        expect(greeting('mahmoud')).toBe('Hello, mahmoud!'); // it match exact value
        expect(greeting('mahmoud')).toMatch('Hello, '); // relaxation in matching
    });
});
```

**_[&uarr;top](#content)_**

### Arrays

#### Matchers

-   toContain

> Note: we can also use `not` with `toContains`

**_Example_**

```js
// index.js
const animals = ['cat', 'dog', 'cow'];
```

```js
// index.test.js

describe('animals', () => {
    it('should return true for cat', () => {
        expect(animals).toContain('cat');
    });

    it('should return false for hourse', () => {
        expect(animals).not.toContain('hourse');
    });
});
```

**_[&uarr;top](#content)_**

### Objects

#### Matchers

-   toMatchObject
-   toHaveProperty

**_Example_**

```js
// index.js
const getItemById = (id) => {
    return {
        id: id,
        price: 10,
    };
};
```

```js
// index.test.js

describe('getItemById', () => {
    it('should return {id: 1, price: 10} for id = 1', () => {
        expect(getItemById(1)).toMatchObject({ id: 1 });
        expect(getItemById(1)).toHaveProperty('id', 1);
    });
});
```

**_[&uarr;top](#content)_**

### Errors

#### Matchers

-   toThrow
-   toThrowError

**_Example_**

```js
// index.js
const getItemById = (id) => {
    if (!id) {
        throw new Error('ID is not defined, please provide id!');
    }

    if (id < 0 || id > 5) {
        throw new Error('Invalid ID!');
    }

    return {
        id: id,
        price: 10,
    };
};
```

```js
// index.test.js
describe('getItemById', () => {
    it('should return {id: 1, price: 10} for id = 1', () => {
        expect(getItemById(1)).toMatchObject({ id: 1 });
        expect(getItemById(1)).toHaveProperty('id', 1);
    });

    // testing Errors
    it('should throw an error that id is not defined', () => {
        expect(() => getItemById()).toThrow();
        expect(() => getItemById()).toThrowError('ID is not defined');
    });

    it('should throw error of Invalid ID! for id: -1', () => {
        expect(() => getItemById(-1)).toThrowError('Invalid');
    });
});
```

**_[&uarr;top](#content)_**

### Async Code

#### Matchers

-   resolves
-   rejects

**_Example_**

```js
// index.js
const getItems = async () => {
    return [
        { id: 1, price: 20 },
        { id: 2, price: 80 },
        { id: 3, price: 30 },
    ];
};
```

```js
// index.test.js
describe('getItems', () => {
    it('should return list of orders', async () => {
        expect(await getItems()).toContainEqual({ id: 1, price: 20 });
        //OR
        await expect(getItems()).resolves.toContainEqual({ id: 2, price: 80 });
    });
});
```

**_[&uarr;top](#content)_**

### Mocking

> Mock functions allow you to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.  
> _[ref](https://jestjs.io/docs/mock-functions)_

#### How to mock a function

it's very simple with using of `jest.fn()`

> Note: we can't back to original implementation with this way so I implement a method that attach original implementation to mock object

```js
/**
 * Creates a mock function and attaches the original implementation to the mock object.
 *
 * @param {Function} fn - The original function to be mocked.
 * @returns {Function} A Jest mock function with the original implementation attached.
 */
const createMock = (fn) => {
    const mockFn = jest.fn();
    mockFn.mock.original = fn;
    return mockFn;
};
```

**_Example of usage_**

```js
// Example usage in a test scenario

// Original function to be mocked
const originalAdd = (a, b) => a + b;

// Create a mock with the original implementation attached
const mockedAdd = createMock(originalAdd);

// Mock the implementation of the mock function
mockedAdd.mockReturnValue(42);

// Using the mocked function
const result = mockedAdd(10, 20);

console.log(result); // Output: 42
console.log(mockedAdd.mock.original(10, 20)); // Output: 30 (original implementation)
```

so mock properity will be like that:

```js
    {
      calls: [],
      contexts: [],
      instances: [],
      invocationCallOrder: [],
      results: [],
      original: [Function: originalAdd]
    }
```

**_[&uarr;top](#content)_**

#### Mocking module

```js
// index.js
const { default: axios } = require('axios');

const fetchData = async () => {
    const data = await axios.get('http://example.com');
    // implementation
    return data;
};
```

```js
const { default: axios } = require('axios');
// index.test.js
jest.mock('axios');
describe('fetchData', () => {
    it('should return some data', async () => {
        axios.get.mockResolvedValue({ id: 5 });
        const data = await fetchData();
        expect(data).toMatchObject({ id: 5 });
    });
});
```

**_Full Example_**

```js
// db.js
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
```

```js
// email.js
const sendEmail = (email, totalPrice) => {
    console.log('Email sent successfully :)');
};

module.exports = {
    sendEmail,
};
```

```js
// index.js
const db = require('./db');
const email = require('./email');

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
    createOrder,
};
```

```js
const db = require('./db');
const email = require('./email');
const { createOrder } = require('./index');

// mocking
const createMock = (fn) => {
    const mockFn = jest.fn();
    mockFn.mock.original = fn;
    return mockFn;
};

describe('craeteOrder', () => {
    // create mocks
    beforeAll(() => {
        email.sendEmail = createMock(email.sendEmail);
        db.createOrder = createMock(db.createOrder);
        db.getUser = createMock(db.getUser);
        console.log(email.sendEmail.mock);
    });

    // restore mocks
    afterAll(() => {
        email.sendEmail = email.sendEmail.mock.original;
        db.createOrder = db.createOrder.mock.original;
        db.getUser = db.getUser.mock.original;
    });

    // data used in testing
    const userId = 1;
    const products = [
        { id: 1, price: 20 },
        { id: 2, price: 30 },
    ];

    // userId not found
    it('should throw error that userId not found', async () => {
        await expect(createOrder()).rejects.toThrow('userId not found');
    });

    // products not found
    it('should throw an error that products not found', async () => {
        await expect(createOrder(userId)).rejects.toThrow('products not found');
    });

    // user not found
    it('should throw an error that user with id: 1 is not found', async () => {
        db.getUser.mockReturnValue(undefined);
        await expect(
            createOrder(userId, products)
        ).rejects.toThrowErrorMatchingSnapshot('Not found a user with');
    });

    // order created and email sent
    it('should create order successfully', async () => {
        db.getUser.mockReturnValue({
            id: userId,
            name: 'example',
            email: 'example@gmail.com',
        });

        await expect(createOrder(userId, products)).resolves.toMatch(
            'Order created'
        );

        expect(db.createOrder).toBeCalled();

        expect(email.sendEmail).toBeCalled();
    });
});
```

**_[&uarr;top](#content)_**

> Note: You can find all the code examples mentioned in this README within the corresponding files provided in this repository. Feel free to clone this repository to your local machine and test them :)
