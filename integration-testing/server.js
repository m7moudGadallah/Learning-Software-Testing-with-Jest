const connectedDBPromise = require('./config'); // connectDB + load ENV variables

const app = require('./src/app');

//env vars
const { PORT = 5000, NODE_ENV: MODE } = process.env;

// create server
const server = app.listen(PORT, async () => {
    console.log(
        `App is running in ${MODE} mode on port ${PORT}🚀...`.brightMagenta
            .underline.bold.italic
    );

    await connectedDBPromise;
});

module.exports = server;
