const jwt = require('jsonwebtoken');
const User = require('../Models/model');
const bcrypt = require('bcrypt')


exports.create_user = (req, res, next)=>{
    User.find({Email: req.body.Email})
        .exec()
        .then((user_find)=>{
            if(user_find.length>=1)
            {
                res.status(409).json({
                    Error: "Authentication Failed"
                })
            }
    
            else
            {
                bcrypt.hash(req.body.Password, 10, (err, hash)=>{
                    
                    if(err)
                    {
                        res.status(500).json({
                            Error: "Authentication Failed"
                        })
                    }
    
                    else
                    {
                        const new_user = new User({
                            Full_Name:  req.body.Full_Name,
                            Email: req.body.Email,
                            Password: hash,
                            Birth_Date: req.body.Birth_Date,
                            Sex: req.body.Sex,
                            Nationality: req.body.Nationality,
                            Instagram_Account: req.body.Instagram_Account,
                            Phone_Number: req.body.Phone_Number,
                            Mother_Agency: req.body.Mother_Agency,
                            Current_Agency: req.body.Current_Agency,
                            Invitation_Code: req.body.Invitation_Code
                        })
                        new_user.save()
                        .then((user)=>{
                            console.log(user)
                            res.status(201).json({
                                Message: "Successfully Created User Account"
                            });
                        })
                        .catch((error)=>{
                            res.status(401).json({
                                Message:"Authentication Failed"
                        });
                    });
                }
            })  
        }
    })
    .catch((err)=>{
        res.status(401).json({
            Message: "Authentication Failed"
    }) 
 })
}


exports.signin_user = (req, res, next)=>{
    User.find({Email: req.body.Email})
    .exec()
    .then((user_found)=>{
        if(user_found.length<1)
        {
            res.status(401).json({
                Message: "Authentication Failed"
            });
        }

        bcrypt.compare(req.body.Password, user_found[0].Password, (err, response)=>{
            if(err)
            {
                return res.status(401).json({
                    Message: "Invalid Email or Password"
                });
            }

            if(response)
            {
                const token = jwt.sign({
                    Email: user_found[0].Email
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                }
                );
                res.status(200).json({
                    Message: "You Have Successfully Logged In",
                    Access_Token: token
                });
            }

        })
    })
    .catch((error)=>{
        res.status(500).json({
            Message: error
        });
    });
}
