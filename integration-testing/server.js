require('colors'); // colorize logs
const dotenv = require('dotenv');
const { configENV, db } = require('./src/config');

dotenv.config({ path: configENV }); // load env vars
const app = require('./src/app');

//env vars
const {
    PORT = 5000,
    NODE_ENV: MODE,
    DATABASE_URI,
    DATABASE,
    DATABASE_TEST,
    DATABASE_PASSWORD,
} = process.env;

// connect to database
db.connectDB({
    DATABASE_URI,
    DATABASE: MODE === 'testing' ? DATABASE_TEST : DATABASE,
    DATABASE_PASSWORD,
});

// create server
app.listen(PORT, () => {
    console.log(
        `App is running in ${MODE} mode on port ${PORT}🚀...`.brightMagenta
            .underline.bold.italic
    );
});
