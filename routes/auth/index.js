const express = require('express')
const router = express.Router()

const userLogin = require('./handlers/userLogin')
const registerUser = require('./handlers/registerUser')
const passport = require('../../config/passport')

router.post('/register', registerUser)
router.post('/login', passport.authenticate('local', { session: false }), userLogin)

module.exports = router