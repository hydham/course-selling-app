const mongoose = require('mongoose');
const schema = mongoose.Schema;

const adminSchema = new schema({
    username: {type: String},
    password: {type: String}
})
const courseSchema = new schema({
    title: {type: String},
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
})
const userSchema = new schema({
    username: {type: String},
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses"
    }]
})

const ADMINS = mongoose.model("admins", adminSchema)
const COURSES = mongoose.model("courses", courseSchema)
const USERS = mongoose.model("users", userSchema)

module.exports = {
    ADMINS,
    COURSES,
    USERS
}