const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "users" // Model name of the User schema

    },


    leaveType: String,
    startDate: String,
    endDate: String,
    duration: Number,
    resumptionDate: String,
    leaveReason: String,
    reliefOfficer: String,
    status: String,
    newResumptionDate: String,
    daysRemain: Number

});

const leaves = mongoose.model("leaves", leaveSchema);

module.exports = leaves;