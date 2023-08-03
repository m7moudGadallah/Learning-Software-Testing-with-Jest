const {
    sum,
    greeting,
    animals,
    getItemById,
    getItems,
    fetchData,
    createOrder,
} = require('./index');
const db = require('./db');
const email = require('./email');
const { default: axios } = require('axios');

// testing Numbers
describe('sum', () => {
    it('should be 5 for 2 + 3', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(2, 3)).toEqual(5);
    });

    it('should be close to 3.5 for 2 + 1.502', () => {
        expect(sum(2, 1.502)).toBeCloseTo(3.5);
    });
});

// testing Strings
describe('greeting', () => {
    it('should return Hello, mahmoud! for mahamoud', () => {
        expect(greeting('mahmoud')).toBe('Hello, mahmoud!'); // it match exact value
        expect(greeting('mahmoud')).toMatch('Hello, '); // relaxation in matching
    });
});

//testing arrays
describe('animals', () => {
    it('should return true for cat', () => {
        expect(animals).toContain('cat');
    });

    it('should return false for hourse', () => {
        expect(animals).not.toContain('hourse');
    });
});

// testing objects
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

// testing async
describe('getItems', () => {
    it('should return list of orders', async () => {
        expect(await getItems()).toContainEqual({ id: 1, price: 20 });
        //OR
        await expect(getItems()).resolves.toContainEqual({ id: 2, price: 80 });
    });
});

// mocking module
jest.mock('axios');
describe('fetchData', () => {
    it('should return some data', async () => {
        axios.get.mockResolvedValue({ id: 5 });
        const data = await fetchData();
        expect(data).toMatchObject({ id: 5 });
    });
});

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
