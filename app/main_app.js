const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const auth = require('../api/Views/auth');
const swaggerDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(morgan('dev'));
app.use(cors())

//Swagger Definitions
const swaggerDefinition = {
    info: {
        title: 'User Authentication Swagger API',
        version: '1.0.0',
        description: 'Endpoints to test the user registration/login routes'
    },
    host: 'localhost:3000',
    basePath: '/'
};

const options = {
    swaggerDefinition,
    apis: ['./api/Views/*.js']
}

const swaggerSpec = swaggerDoc(options)

app.get('/swagger.json', (req, res, next)=>{
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use('/user', auth);

//Error Handling
app.use((req, res, next)=>{
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        Error: error
    })
})

module.exports = app