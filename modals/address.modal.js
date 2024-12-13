const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "users" // Model name of the User schema

    },

    doorNumber: String,
    city: String,
    state: String,
    pinCode: String,
    residentialAddress: String,


});

const address = mongoose.model("Address", addressSchema);

module.exports = address;