const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('../api/Views/auth');
const swaggerDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
const app = express();


mongoose.connect('mongodb+srv://josekodek2000@gmail.com:josekodek2000%24@cluster0-6et8g.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
.then((feedback)=>{
    console.log('Connection Successfully')
})
.catch((error)=>{
    console.log(error)
})

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(cors());

//Swagger Definitions
const swaggerDefinition = {
    info: {
        title: 'User Authentication Swagger API',
        version: '1.0.0',
        description: 'Endpoints to test the user registration/login routes'
    },
    schemes: ['https'],
    host: 'square-authentication.herokuapp.com',
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