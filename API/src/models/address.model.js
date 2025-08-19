const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    mobile: {
        type: String,
        required: true
    },
});


const Address = mongoose.model("address", AddressSchema);
module.exports = Address;