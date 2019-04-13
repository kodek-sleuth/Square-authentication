const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const auth = require('../api/Views/auth');
const app = express();

//Database Connection
mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(morgan('dev'));
app.use(cors())

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