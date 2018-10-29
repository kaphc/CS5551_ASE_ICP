const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const  studentSchema = new Schema({
    class_id: String,
    student_name: String,
    course_of_study:String,
    major:String,
    minor:String
});

module.exports = mongoose.model('student', studentSchema, 'students');
