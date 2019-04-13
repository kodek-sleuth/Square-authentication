const Customer = require('../Models/collection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Pool = require('pg').Pool;
const connectionString = process.env.DATABASE_URI;
const pool = new Pool({connectionString: connectionString})

const createDatabase = (req, res, next)=>{
    pool.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(150) NOT NULL UNIQUE, password TEXT NOT NULL)')
    .then((feedback)=>{
        console.log(feedback)
        pool.end()
    })
    .catch((error)=>{
        res.status(500).json({Error: error})
        console.log(error)
    })
}

createDatabase()

exports.create_user = (req, res, next)=>{
    console.log(req.file);
    var insert_query = 'INSERT INTO users(email, password) VALUES($1, $2)'
    
    pool.query(`Select * from users where email='${req.body.Email}'`)
    .then((result)=>{
        if(result.rows==0)
        {
            bcrypt.hash(req.body.Password, 10, (err, hash)=>{
                var request_body = [req.body.Email, hash]
                if(err)
                {
                    res.status(500).json({
                        Error: "Authentication Failed"
                    })
                }

                else
                {
                    
                    
                    pool.query(insert_query, request_body, (error, result)=>{
                        if(error)
                        {
                            res.status(500).json({
                                Error: error
                            })
                        }
        
                        else
                        {
                            
                            res.status(201).json({
                                Message: "User Successfully Created"
                            })
                        }
                    })
                }
            })
           
        }

        else
        {
            res.status(500).json({
                Error: "Authentication Failed"
            });
        }
        
    })        
    .catch((error)=>{
        res.status(500).json({
            Error: error
        });
    });  
}

exports.sigin_user = (req, res, next)=>{
    pool.query(`Select * from users where email='${req.body.Email}'`)
    .then((feedback)=>{
        if(feedback.rowCount>0)
        {
            const user_details_DB = feedback.rows

            bcrypt.compare(req.body.Password, user_details_DB[0].password, (error, response)=>{
               if(error)
               {
                    res.status(401).json({
                        Error: "Invalid Email or Password"
                    });
               }

               if(response)
               {
                const token = jwt.sign({
                    Email: user_details_DB[0].email
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                }
                )
                
                    res.status(200).json({
                        Success: "Successfully Logged In",
                        "Access_Token": token
                    });
               }
            })
        }

        else
        {
            res.status(401).json({
                Error: "Invalid Email or Password"
            });
        }
    })

    .catch((error)=>{
        res.status(401).json({
            Error: error
        });
    })
}