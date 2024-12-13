const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber2: Number,
    password: String,
    Status: String,

});

const user = mongoose.model("users", userSchema);

module.exports = user;