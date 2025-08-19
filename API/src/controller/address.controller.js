const addressService = require("../services/address.service.js");

exports.addAddress = async (req, res) => {
    try {
        const addressData = req.body;
        const newAddress = await addressService.createAddress(addressData);

        return res.status(201).json({
            message: "Address added successfully",
            address: newAddress,
        });
    } catch (error) {
        console.error("Error adding address:", error);
        return res.status(500).json({ message: "Failed to add address" });
    }
};

exports.getUserAddresses = async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await addressService.getAddressesByUser(userId);

        return res.status(200).json({
            message: "User addresses fetched successfully",
            addresses,
        });
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return res.status(500).json({ message: "Failed to fetch addresses" });
    }
};




// Delete an address
exports.deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;

        const deletedAddress = await addressService.deleteAddress(addressId);

        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }

        res.status(200).json({
            message: "Address deleted successfully",
            deletedAddress,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete address", error: error.message });
    }
};
