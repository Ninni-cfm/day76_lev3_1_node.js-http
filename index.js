const fs = require('fs');
const http = require('http');
const path = require('path');


const server = http.createServer((req, res) => {

    console.log(req.url);

    let filePath = (req.url === '/') ? './public/index.html' : `./public${req.url}`;
    filePath = req.url === '/favicon.ico' ? `./public${req.url}` : filePath;
    let mimeType = 'text/html';

    switch (path.extname(filePath)) {
        case '.ico':
            mimeType = 'icon/x-icon';
            break;
        case '.jpg':
        case '.jpeg':
            mimeType = 'image/jpeg';
            break;
        case '.png':
            mimeType = 'image/png';
            break;
        case '.css':
            mimeType = 'text/css';
            break;
        case '.js':
            mimeType = 'text/javascript';
            break;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': mimeType }).end(data);
    })
});

server.listen(3000, () => { console.log("Webserver is listening to 127.0.0.1:3000") });
