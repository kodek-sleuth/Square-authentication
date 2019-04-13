const express = require('express');
const auth = express.Router();
const auth_controller = require('../Controllers/auth_controller')

auth.use('/signup', auth_controller.signup_User)

auth.use('/signin', auth_controller.signin_User)

module.exports = auth