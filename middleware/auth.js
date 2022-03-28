/**
 * auth.js
 */

const jwt = require("jsonwebtoken");
const { ACCESSS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

 const authenticateToken = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null)
      return res.sendStatus(401)
    jwt.verify(token, ACCESSS_TOKEN_SECRET, (err, userCredential) => {
      if (err)
        return res.sendStatus(403)
      //req.user = userCredential
      console.log(userCredential)
      console.log(`token accessed`)
      next()
    })
  }
  

  module.exports = authenticateToken;