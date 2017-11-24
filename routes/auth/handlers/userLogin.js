const jwt = require('jsonwebtoken')
const { SECRET } = process.env

function login(req, res) {
  const { _id: id } = req.user
  const token = jwt.sign({ id }, SECRET)
  res.json({ token })
}

module.exports = login