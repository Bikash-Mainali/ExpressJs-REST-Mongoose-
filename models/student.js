/**
 * student.js
 */

"use strict"

const mongoose = require('mongoose')
const { emailValidate } = require('./validator')
const educationSchema = new mongoose.Schema({
    undergraduate: {
        isGraduate: Boolean,
        passedYear: Date,
        cgpa: Number
    },
    graduate: {
        isGraduate: Boolean,
        passedYear: Date,
        cgpa: Number
    }
})
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    age: {
        type: Number,
        min: 1,
        max: 200
    },
    email: {
        type: String,
        minLength: 10,
        required: true,
        lowercase: true,
        unique: true,
        //match: [emailValidate, 'invalid email address']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    dateOfBirth: Date,
    isGraduate: Boolean,
    hobbies: [String],
    address: {
        street: String,
        city: String
    },
    degree: educationSchema

})

module.exports = mongoose.model('Student', studentSchema);  