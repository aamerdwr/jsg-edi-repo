const http = require('http');
const {
    app
} = require('./app');

const hostname = "ec2-3-25-177-193.ap-southeast-2.compute.amazonaws.com";

const port = 8888;

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at ${port}`)
});