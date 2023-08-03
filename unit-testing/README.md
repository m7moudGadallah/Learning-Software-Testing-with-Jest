# Unit Testing

<!-- TOC -->

- [Unit Testing](#unit-testing)
    - [Introduction](#introduction)
        - [Advantages](#advantages)
        - [Disadvantages](#disadvantages)
    - [Testing withJest](#testing-withjest)
        - [Numbers](#numbers)
            - [Matchers](#matchers)
        - [Strings](#strings)
            - [Matchers](#matchers)
        - [Arrays](#arrays)
            - [Matchers](#matchers)
        - [Objects](#objects)
            - [Matchers](#matchers)
        - [Errors](#errors)
            - [Matchers](#matchers)
        - [Async Code](#async-code)
            - [Matchers](#matchers)

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
