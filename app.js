/**
 * app.js
 */

"use strict";
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const studentRouter = require('./routes/student')
const authRouter = require('./routes/auth')
require('./config/DBConfig')   //importing database connection
const { PORT } = process.env


app.use(express.json())  


app.use("/user", authRouter)
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



app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})

console.log("server started running")