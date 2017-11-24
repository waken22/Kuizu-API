const passport = require('passport')

const User = require('../../models/User')
const jwtStrategy = require('./strategies/jwt')

passport.use(User.createStrategy())
passport.use(jwtStrategy)

module.exports = passport