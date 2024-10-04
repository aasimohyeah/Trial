const fs = require('fs');

//function replacetemplate 
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic)
    {
        output = output.replace(/{%NOT_ORGANIC}/g, 'not-organic');
    }
    return output;
}

const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');

//${__dirname} not working, so using . instead
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

//SERVER
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    //res.end('Hello from the server\nGae');

    //to see number of request made by website use
    //console.log(req.url);
    //to see explanation of url.parse use
    //console.log(url.parse(req.url, true));

    const {query, pathname} = url.parse(req.url, true);// query and pathname fetched 
    //using url.parse(req.url ,true) and then indexing on the result
    
    //implemented basic routing below
    //Overview Page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        //.join used to join all output strings into one
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);
    }
    //Product Page
    else if(pathname === '/product'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    //API
    else if(pathname == '/api'){
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
    }
    //Not found
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