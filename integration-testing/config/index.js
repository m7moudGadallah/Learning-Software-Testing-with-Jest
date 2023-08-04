require('colors'); // colorize logs
const dotenv = require('dotenv');
const configENV = `${__dirname}/config.env`;
dotenv.config({ path: configENV }); // load env vars

const db = require('./db');

//env vars
const {
    NODE_ENV: MODE,
    DATABASE_URI,
    DATABASE,
    DATABASE_TEST,
    DATABASE_PASSWORD,
} = process.env;

// connect to database
const connectedDBPromise = db.connectDB({
    DATABASE_URI,
    DATABASE: MODE === 'testing' ? DATABASE_TEST : DATABASE,
    DATABASE_PASSWORD,
});

module.exports = connectedDBPromise;