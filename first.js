// const fs = require('fs');
// console.log("GIT setup success");

//SERVER
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    //res.end('Hello from the server\nGae');
    
    const pathName = req.url;
    
    //implement basic routing below
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the OVERVIEW');
    }
    else if(pathName === '/product'){
        res.end('This is the PRODUCT');
    }
    else
    {
        res.writeHead(404, {
            'Content-type' : 'text/html',//browser expects html
            'my-own-header' : 'hello-world'//custom header made by us
        });
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});