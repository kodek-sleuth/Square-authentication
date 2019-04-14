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
*           Full_Name:
*             type: string
*           Email:
*             type: string
*           Password:
*             type: string
*             format: password
*           Birth_Date:
*             type: string
*           Sex:
*             type: string
*           Nationality:
*             type: string
*           Instagram_Account:
*             type: string
*           Phone_Number:
*             type: string
*           Mother_Agency:
*             type: string
*           Current_Agency:
*             type: string
*           Invitation_Code:
*             type: string
*         required:
*           - Full_Name
*           - Email
*           - Password
*           - Birth_Date
*           - Sex
*           - Nationality
*           - Instagram_Account
*           - Phone_Number
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