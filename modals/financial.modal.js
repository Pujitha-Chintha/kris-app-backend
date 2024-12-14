const mongoose = require('mongoose')

const financialDetailsSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "users" // Model name of the User schema

    },

    bankName: String,
    accountNumber: String,
    accountName: String,
    registeredWith: String,
    pensionNumber: String

});

const financialDetails = mongoose.model("financialDetails", financialDetailsSchema);

module.exports = financialDetails;