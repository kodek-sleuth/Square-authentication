const User = require('../Models/collection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.signup_User = (req, res, next)=>{
    User.find({Email: req.body.Email})
    .exec()
    .then((user_found)=>{
        if(user_found.length>=1)
        {
            res.status(500).json({
                Error: "Invalid Email or Password"
            })
        }

        else
        {
            bcrypt.hash(req.body.Password, 10, (error, hash)=>{
                if(error)
                {
                    
                }
            });
        }
    })
    .catch((err)=>{
        res.status(500).json({
            Error: err
        })
    })
}