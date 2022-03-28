/**
 * login.js
 */

"user strict"

const mongoose = require('mongoose')
const { emailValidate } = require('./validator')
const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  secondName: { type: String, default: null },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
})
module.exports = mongoose.model('User', userSchema);  
