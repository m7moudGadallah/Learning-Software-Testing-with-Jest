const mongoose = require('mongoose');
const connectedDBPromise = require('../../config'); // connectDB + load ENV variables
const { Book } = require('../../src/models');
const Service = require('../../src/controllers/Service');

const service = new Service(Book);

beforeAll(async () => {
    await connectedDBPromise;
    await Book.deleteMany();
}, 20000);

beforeEach(async () => {
    await Book.deleteMany();
});

afterEach(async () => {
    await Book.deleteMany();
});

afterAll(async () => {
    await Book.deleteMany();
    await mongoose.disconnect();
}, 20000);

describe('Service', () => {
    describe('count', () => {
        it('should return 0 for an empty collection', async () => {
            const count = await service.count();
            expect(count).toBe(0);
        });

        it('should return 1 when the collection contains one document', async () => {
            const book = await Book.create({
                title: 'Book1',
                price: 20,
                description: 'Book about C++',
            });

            const count = await service.count();
            expect(count).toBe(1);
        });
    });

    describe('isExist', () => {
        it('should return false for an empty collection', async () => {
            const isExist = await service.isExist('64cd29d31dc7de26ab97d063');
            expect(isExist).toBeFalsy();
        });

        it('should return true for an existing document', async () => {
            const book = await Book.create({
                title: 'Book1',
                price: 20,
                description: 'Book about C++',
            });

            const isExist = await service.isExist(book._id);
            expect(isExist).toBeTruthy();
        });
    });

    describe('get', () => {
        it('should return an empty list of documents for an empty collection', async () => {
            const docs = await service.get();
            expect(docs.length).toBe(0);
        });

        it('should return a list of 2 documents after inserting 2 documents', async () => {
            await Book.insertMany([
                { title: 'Book1', price: 20, description: 'Book about C++' },
                {
                    title: 'Book2',
                    price: 200,
                    description: 'Book about Clean code',
                },
            ]);

            const docs = await service.get();
            expect(docs.length).toBe(2);
        });
    });

    describe('getOne', () => {
        it('should return a document that matches the passed ID', async () => {
            const book = await Book.create({
                title: 'Book1',
                price: 20,
                description: 'Book about C++',
            });

            const doc = await service.getOne(book._id);
            expect(doc).toHaveProperty('_id', book._id);
        });
    });

    describe('createOne', () => {
        it('should create a new document in the collection', async () => {
            const newDoc = await service.createOne({
                title: 'Book1',
                price: 20,
                description: 'Book about C++',
            });

            expect(newDoc).toMatchObject({
                title: 'Book1',
                price: 20,
                description: 'Book about C++',
            });
        });
    });

    describe('updateOne', () => {
        it('should update the document', async () => {
            const book = await Book.create({
                title: 'Book1',
                price: 20,
                description: 'Book about C++',
            });

            const updatedDoc = await service.udpateOne(book._id, { price: 50 });

            expect(updatedDoc).toHaveProperty('price', 50);
        });
    });

    describe('deleteOne', () => {
        it('should delete the document', async () => {
            const book = await Book.create({
                title: 'Book1',
                price: 20,
                description: 'Book about C++',
            });

            await service.deleteOne(book._id);

            const deletedDoc = await Book.findById(book._id);
            expect(deletedDoc).toBeNull();
        });
    });
});
