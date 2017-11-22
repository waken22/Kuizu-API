const express = require('express')

const router = express.Router()

const handleLogin = require('./handlers/handleLogin')

router.post('/', handleLogin)


module.exports = router