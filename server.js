const http = require('http');

const app = require('./app/main_app');

const port = 3000;

const server_run = http.createServer(app);

server_run.listen(process.env.PORT || port)