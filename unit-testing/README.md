# Unit Testing

> Tests unit of your app without its external dependencies

## Advantages

-   easy to write
-   Excute Fast

## Disadvantages

-   Don't give alot of Confidence

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

