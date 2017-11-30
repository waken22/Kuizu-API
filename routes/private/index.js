const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')
const getUserInfo = require('./handlers/getUserInfo')
const updateProfile = require('./handlers/updateProfile')

// all these routes require JWT token
router.use( passport.authenticate('jwt', { session: false }) )


router.get('/getUser', getUserInfo)
router.put('/profile', updateProfile)

module.exports = router