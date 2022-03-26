// /**
//  * dbconnection.js
//  */

"use strict";
const dbConfig = (function () {
  const mongoose = require('mongoose')
  mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', (error) => console.error(error))
  db.once('open', () => console.log('Connected to Database'))
})()

module.exports = dbConfig;






