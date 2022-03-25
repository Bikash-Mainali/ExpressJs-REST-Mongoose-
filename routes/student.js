/**
 * student.js
 */

"use script";
const express = require("express");
const app = express();
const studentRouter = express.Router();
const dbConfig = require('../config/DBConfig')


//for testing db connection
studentRouter.get('/dbtest', async function (req, res) {
    databasesList = await dbConfig.getClient().db().admin().listDatabases();
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    res.json(databasesList.databases);
});



// Getting all
studentRouter.get('/', async function (req, res) {
    // for testing database connection
    // listDatabases(client)  
    const collection = dbConfig.getDb().collection('student_info')
    collection.find().toArray(function (err, items) {
        res.status(200).json(items);
    });
})


studentRouter.post('/', async function (req, res) {
    const collection = dbConfig.getDb().collection('student_info')
    collection.insertOne(req.body, function (err, info) {
        res.status(201).json(info);
    });
})


studentRouter.put('/:sId', async function (req, res) {
    const collection = dbConfig.getDb().collection('student_info')
    collection.findOneAndUpdate({ _id: req.params.sId }, { $set: req.body }, function () {
        res.redirect(302, "/student/");
    })
})

studentRouter.delete('/:sId', async function (req, res) {
    const collection = dbConfig.getDb().collection('student_info')
    collection.deleteOne({ _id: req.params.sId }, function () {
        res.status(200).json({ message: 'successfully deleted', deletedId: req.params.sId });
    })
})


module.exports = studentRouter;