const express = require('express')
const { validateSignup } = require('../middleware');
const { registerUser, userLogin } = require('../controller/user');
const router = express.Router()

router.post("/register", validateSignup, registerUser);

router.post("/login", userLogin);

module.exports = router;