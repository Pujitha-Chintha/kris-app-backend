const mongoose = require('mongoose')

const guarantorDetailsSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "users" // Model name of the User schema

    },

    guarantorName: String,
    occupation: String,
    PhoneNumber: String

});

const guarantorDetails = mongoose.model("guarantorDetails", guarantorDetailsSchema);

module.exports = guarantorDetails;