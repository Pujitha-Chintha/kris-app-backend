const mongoose = require('mongoose')

const familyDetailsSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "users" // Model name of the User schema

    },

    nameOfFamilyMember: String,
    relationship: String,
    phoneNumber: String,
    address: String

});

const familyDetails = mongoose.model("familyDetails", familyDetailsSchema);

module.exports = familyDetails;