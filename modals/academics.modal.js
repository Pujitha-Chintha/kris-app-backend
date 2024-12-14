const mongoose = require('mongoose')

const academicDetailsSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "users" // Model name of the User schema

    },

    nameOfInstitute: String,
    department: String,
    course: String,
    instituteLocation: String,
    academicStartDate: String,
    academicEndDate: String,
    description: String,

});

const academicDetails = mongoose.model("academicDetails", academicDetailsSchema);

module.exports = academicDetails;