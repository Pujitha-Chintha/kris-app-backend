const mongoose = require('mongoose')

const kinDetailsSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "users" // Model name of the User schema

    },

    kinName: String,
    kinJob: String,
    kinPhoneNumber: String,
    kinRelationship: String,
    kinResidentialAddress: String,


});

const kinDetails = mongoose.model("kinDetails", kinDetailsSchema);

module.exports = kinDetails;