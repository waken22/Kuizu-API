const User = require('../../../models/User.js')

function updateProfile (req, res) {
  const { _id: id } = req.user
  const { avatar } = req.body
  User.findByIdAndUpdate(id, {
    $set: {
      avatar: avatar || undefined,
    }},
    { new: true }
  )
  .then(user => { res.status(200).json({ user, msg: 'user updated properly...' }) })
  .catch(error => { res.status(500).json({ error, msg: 'problems updating user...' }) })
}

module.exports = updateProfile