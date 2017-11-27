const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema
const collection = 'users'


const UserSchema = new Schema({
  username: String,
  password: String,
  email: { type: String, unique: true, dropDups: true },
  avatar: String,
  date_of_creation: String,
  user_type: Number
}, { collection })

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)