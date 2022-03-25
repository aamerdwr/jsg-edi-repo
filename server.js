const http = require('http');
const {
    app
} = require('./app');

const hostname = "192.168.16.1";

const port = 9000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at ${port}`)
});