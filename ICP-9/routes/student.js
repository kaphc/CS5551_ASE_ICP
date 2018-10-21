const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/student');

const database = "mongodb://kaphc:Xyloa7707@ds137263.mlab.com:37263/icp_9";

mongoose.Promise = global.Promise;
mongoose.connect(database, function (err) {
    if(err){
        console.error("Error : " + err);
    }
});

router.get('/students', function(req, res){
    console.log('Get request for all students');
    Student.find({})
        .exec(function (err, students) {
            if(err){
                console.log("Error : " + err);
            } else {
                res.json(students);
            }
        })
});

router.get('/student/:id', function(req, res){
    console.log('Get request for a student');
    Student.findById(req.params.id)
        .exec(function (err, student) {
            if(err){
                console.log("Error : " + err);
            } else {
                res.json(student);
            }
        })
});

router.get('/student_by_major/:major', function(req, res){
    console.log('Get request for all students');
    Student.find({major:{'$regex': req.params.major}})
        .exec(function (err, students) {
            if(err){
                console.log("Error : " + err);
            } else {
                res.json(students);
            }
        })
});

router.post('/student', function(req, res){
    console.log('Add a student');
    var newStudent = new Student();

    newStudent.class_id = req.body.class_id;
    newStudent.student_name = req.body.student_name;
    newStudent.course_of_study = req.body.course_of_study;
    newStudent.major = req.body.major;
    newStudent.minor = req.body.minor;

    newStudent.save(function(err, insertStudent){
        if(err){
            console.log("Error : " + err);
        } else {
            res.json(insertStudent);
        }
    });
});

router.put('/student/:id', function(req, res){
    console.log('Update a student');
    Student.findByIdAndUpdate(req.params.id,
        {
            $set: {class_id: req.body.class_id,
                student_name: req.body.student_name,
                course_of_study: req.body.course_of_study,
                major: req.body.major,
                minor: req.body.minor,}
        },
        {
            new: true
        },
        function (err, updatedStudent) {
            if(err){
                res.send("Error : "+ err);
            }
            else {
                res.json(updatedStudent);
            }
        });
});

router.delete('/student/:id', function(req, res){
    console.log('Deleting a student');
    Student.findByIdAndRemove(req.params.id,
        function (err, deletedStudent) {
            if(err){
                res.send("Error : "+ err);
            }
            else {
                res.json(deletedStudent);
            }
        });
});

module.exports = router;
