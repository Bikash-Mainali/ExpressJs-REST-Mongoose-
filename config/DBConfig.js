// /**
//  * dbconnection.js
//  */

"use strict";
const { MongoClient } = require('mongodb');  //mongodb driver

let client = null;
const dbConfig = (function () {

  const getDb = () => {
    client = new MongoClient(process.env.ATLAS_URI);
    client.connect();
    const database = client.db('student_express_mongo');
    return database;
  }

  const getClient = () => {
    getDb();
    return client;
  }

  return {
    getDb: getDb,
    getClient: getClient
  }

})()

module.exports = dbConfig;






