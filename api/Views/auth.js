const express = require('express');
const auth = express.Router();
const auth_controller = require('../Controllers/auth_controller')

//Documentation
/**
* @swagger
* /user/signup:
*   post:
*     tags:
*       - Users
*     name: Signup
*     summary: Signs up a customer
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           Email:
*             type: string
*           Password:
*             type: string
*             format: password
*         required:
*           - Email
*           - Password
*     responses:
*       201:
*         description: Customer Successfully Signed Up
*       500:
*         description: Failed To Authenticate
*/
auth.use('/signup', auth_controller.create_user)

/**
* @swagger
* /user/signin:
*   post:
*     tags:
*       - Users
*     name: Signin
*     summary: Signs in a customer
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         properties:
*           Email:
*             type: string
*           Password:
*             type: string
*             format: password
*         required:
*           - Email
*           - Password
*     responses:
*       200:
*         description: You have Successfully Logged In
*       401:
*         description: Invalid Email or Password
*/
auth.use('/signin', auth_controller.signin_user)

module.exports = auth