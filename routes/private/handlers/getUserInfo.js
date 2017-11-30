const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const { SECRET } = process.env

function getUserInfo(req, res) {
  res.json(req.user)
  
}

module.exports = getUserInfo