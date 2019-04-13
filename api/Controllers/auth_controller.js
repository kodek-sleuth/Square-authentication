const Customer = require('../Models/collection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.signup_Customer = (req, res, next)=>{
    Customer.find({Email: req.body.Email})
    .exec()
    .then((customer_found)=>{
        if(customer_found.length>=1)
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
                    const customer = new Customer({
                        Email: req.body.Email,
                        Password: hash
                    })
                    customer.save()
                    .then((feedback)=>{
                        res.status(201).json({
                            Success: "Customer Successfully Signed Up"
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

exports.signin_Customer = (req, res, next)=>{
    Customer.find({Email: req.body.Email})
    .exec()
    .then((customer_found)=>{
        if(customer_found.length<1)
        {
            res.status(401).json({
                Error: "Invalid Email or Password"
            })
        }

        else
        {
            bcrypt.compare(req.body.Password, customer_found[0].Password, (err, response)=>{
                if(err)
                {
                    res.status(401).json({
                        Error: "Invalid Email or Password"
                    })
                }

                else
                {
                    const token = jwt.sign({
                        Email: req.body.Email
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "2h"
                    }
                    )

                    res.status(200).json({
                        Message: "You  have Successfully Logged In",
                        Token: token 
                    })
                }
            })
        }
    })
    .catch((err)=>{
        res.status(401).json({
            Error: err
        })
    })
}