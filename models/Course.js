const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseShema = new Schema({
    name : {
        type: String,
        unique: true,
        required: true
    },
    desc : {
        type: String,
        unique: true,
        required: true,
        trim:true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const Course = mongoose.model('Course',CourseShema)
module.exports = Course