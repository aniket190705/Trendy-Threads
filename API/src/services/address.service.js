const Address = require("../models/address.model");

exports.createAddress = async (addressData) => {
    console.log("Creating address with data:", addressData);
    const newAddress = new Address(addressData);
    return await newAddress.save();
};

exports.getAddressesByUser = async (userId) => {
    return await Address.find({ user: userId }).populate("user");
};



// Delete address by ID
exports.deleteAddress = async (addressId) => {
    return await Address.findByIdAndDelete(addressId);
};
