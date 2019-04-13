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
                Error: "Failed To Authenticate"
            })
        }

        else
        {
            bcrypt.hash(req.body.Password, 10, (error, hash)=>{
                if(error)
                {
                    res.status(500).json({
                        Error: "Failed To Authenticate"
                    })
                }

                else
                {
                    const user = new User({
                        Email: req.body.Email,
                        Password: hash
                    })
                    user.save()
                    .then((feedback)=>{
                        res.status(201).json({
                            Success: "User Successfully Signed Up"
                        })
                        console.log(feedback)
                    })
                    .catch((err)=>{
                        res.status(500).json({
                            Error: "Failed To authenticate"
                        })
                    })
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