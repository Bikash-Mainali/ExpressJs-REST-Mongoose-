/**
 * app.js
 */

"use strict";
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const studentRouter = require('./routes/student')
require('./config/DBConfig')   //importing database connection


app.use(express.json())  


app.use("/student", studentRouter);

// error handling middleware
app.use((req, res, next) => {
    let err = new Error("404 not found");
    err.status = 404;
    res.json({
        message: err.message,
        status: err.status,
        timeStamp: Date(),
        url: req.originalUrl
    })
});



app.listen(4000, () => {
    console.log(`server started`)
})