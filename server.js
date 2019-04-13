const http = require('http');

const app = require('./app/main_app');

const port = 3000;

http.createServer((req, res)=>{
    res.writeHead(301, {Location:'https://squaremodelsapp.herokuapp.com/api-docs'});
    res.end();
}).listen(process.env.PORT || port);