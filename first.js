// const fs = require('fs');
// console.log("GIT setup success");

//SERVER
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello from the server\nGae');
});
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})