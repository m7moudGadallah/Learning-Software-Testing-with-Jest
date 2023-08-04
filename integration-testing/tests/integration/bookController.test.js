const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../../server');
const connectedDBPromise = require('../../config'); // connectDB + load ENV variables
const { Book } = require('../../src/models');

beforeAll(async () => {
    await connectedDBPromise;
}, 30000);

beforeEach(async () => {
    await Book.deleteMany();
}, 10000);

afterEach(async () => {
    await Book.deleteMany();
}, 10000);

afterAll(async () => {
    await Book.deleteMany();
    await server.close();
    await mongoose.disconnect();
}, 30000);

describe('getAllBooks', () => {
    it('should return 200 and getAllBooks from db', async () => {
        await Book.insertMany([
            { title: 'Book1', price: 20, description: 'Book about C++' },
            { title: 'Book2', price: 30, description: 'Book about Clean Code' },
        ]);

        const res = await request(server).get('/api/v1/books');

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            success: true,
            data: [
                { title: 'Book1', price: 20, description: 'Book about C++' },
                {
                    title: 'Book2',
                    price: 30,
                    description: 'Book about Clean Code',
                },
            ],
        });
    }, 20000);
});

describe('getBook', () => {
    it('should return 200 and get book from db', async () => {
        const book = await Book.create({
            title: 'Book1',
            price: 20,
            description: 'Book about C++',
        });

        const res = await request(server).get(`/api/v1/books/${book._id}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toMatchObject({
            title: 'Book1',
            price: 20,
            description: 'Book about C++',
        });
    }, 20000);
});

describe('createBook', () => {
    it('should return 201 for creating a book', async () => {
        const res = await request(server)
            .post('/api/v1/books')
            .send({ title: 'Book1', price: 20, description: 'Book about C++' });

        expect(res.status).toBe(201);
        expect(res.body.data).toMatchObject({
            title: 'Book1',
            price: 20,
            description: 'Book about C++',
        });
    });
});

describe('updateBook', () => {
    it('should return 200 for updating a book', async () => {
        const book = await Book.create({
            title: 'Book1',
            price: 20,
            description: 'Book about C++',
        });

        const res = await request(server)
            .patch(`/api/v1/books/${book._id}`)
            .send({ price: 30 });

        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty('price', 30);
    });
});

describe('deleteBook', () => {
    it('should return 200 for deleting book', async () => {
        const book = await Book.create({
            title: 'Book1',
            price: 20,
            description: 'Book about C++',
        });

        const res = await request(server).delete(`/api/v1/books/${book._id}`);

        expect(res.status).toBe(200);
        expect(res.body.data).toBeNull();
    });
});
