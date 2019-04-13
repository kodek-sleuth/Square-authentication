const swaggerDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')

exports.swagger_func = () =>{

    const swaggerDefinition = {
        info: {
            Title: 'User Authentication Swagger API',
            Version: '1.0.0',
            Description: 'Endpoints to test the user registration/login routes'
        },
        host: 'localhost:3000',
        basePath: '/'
    };

    const options = {
        swaggerDefinition,
        apis: ['../api/Views/*.js']
    }

};