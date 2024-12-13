const mongoose = require('mongoose')

const userMappingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "users" // Model name of the User schema


    },
    role: String,
    department: String,
    jobTitle: String,
    jobCategory: String,
    lineManager: String


});

const userMapping = mongoose.model("userMapping", userMappingSchema);

module.exports = userMapping;