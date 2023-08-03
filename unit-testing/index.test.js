const { sum } = require('./index');

describe('sum', () => {
    it('should be 5 for 2 + 3', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(2, 3)).toEqual(5);
    })

    it('should be close to 3.5 for 2 + 1.502', () => {
        expect(sum(2, 1.502)).toBeCloseTo(3.5);
    })
})
