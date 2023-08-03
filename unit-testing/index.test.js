const { sum, greeting, animals, getItemById } = require('./index');

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
});
