/*
    Registration: email, password & confirm password

    tests:
        1- all fields are required
        2- password must be 8 chars or more
        3- confirm password match password
        4- all is good, register user
*/
const register = require('./register');

describe('register', () => {
    // Test all fields are required
    it('should return 400 if any field is missing', async () => {
        const res = await register({ email: 'example@gmail.com' });
        expect(res).toBe(400);
    });

    // Test password must be 8 chars or more
    it('should return 400 if password < 8 chars', async () => {
        const res = await register({
            email: 'example@gmail.com',
            password: '1234',
            confirmPassword: '1234',
        });

        expect(res).toBe(400);
    });

    // Test confirm password match password
    it('should return 400 if confirm password does not match password', async () => {
        const res = await register({
            email: 'example@gmail.com',
            password: '12345678',
            confirmPassword: '12345679',
        });

        expect(res).toBe(400);
    });

    // Test all is good, register user
    it('should return 200 and register user', async () => {
        const res = await register({
            email: 'example@gmail.com',
            password: '12345678',
            confirmPassword: '12345678',
        });

        expect(res).toBe(200);
    });
});
