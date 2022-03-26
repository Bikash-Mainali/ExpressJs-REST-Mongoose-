/**
 * student.js
 */

"use script";
const express = require("express");
const student = require("../models/student");
const app = express();
const studentRouter = express.Router();
const Student = require("../models/student")

// Getting all
studentRouter.get('/', async function (req, res) {
    try {
        const students = await Student.find()
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// Getting one
studentRouter.get('/:id', getStudent, async function (req, res) {
    try {
        res.status(200).json(res.student);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Creating one
studentRouter.post('/', async (req, res) => {
    try {
    const student = new Student({
        studentId: req.body.studentId,
        fullName: req.body.fullName,
        age: req.body.age,
        email: req.body.email,
        hobbies: req.body.hobbies,
        dateOfBirth: req.body.dateOfBirth,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        address: req.body.address,
        degree: req.body.degree
    })
    const newStudent = await student.save()
    /*  //alternative
     const newStudent = await Student.create({
         student_id: req.body.student_id,
         full_name: req.body.full_name,
         date_of_birth: req.body.date_of_birth,
         address: req.body.address,
         isGraduate: req.body.is_graduate
     })
     */
    res.status(201).json(newStudent)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})


// Updating One
studentRouter.patch('/:id', getStudent, async (req, res) => {
  if (req.body.fullName != null) {
    res.student.fullName = req.body.fullName
  }
  if (req.body.age != null) {

    res.student.age = req.body.age
  }
  if (req.body.email != null) {

    res.student.email = req.body.email
  }
  if (req.body.hobbies != null) {

    res.student.hobbies = req.body.hobbies
  }
  if (req.body.dateOfBirth != null) {

    res.student.dateOfBirth = req.body.dateOfBirth
  }
  if (req.body.createdAt != null) {

    res.student.createdAt = req.body.createdAt
  }
  if (req.body.updatedAt != null) {

    res.student.updatedAt = req.body.updatedAt
  }
  if (req.body.address != null) {

    res.student.address = req.body.address
  }
  if (req.body.degree != null) {

    res.student.degree = req.body.degree
  }
    try {
      const updatedStudent = await res.student.save()
      res.json(updatedStudent)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })


  // Deleting One
  studentRouter.delete('/:id', getStudent, async (req, res) => {
    try {
      await res.student.remove()
      res.json({ message: 'Deleted Student' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })


  async function getStudent(req, res, next) {
    let student
    try {
      student = await Student.findById(req.params.id)
      if (student == null) {
        return res.status(404).json({ message: 'Cannot find student' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.student = student
    next()
  }


module.exports = studentRouter;