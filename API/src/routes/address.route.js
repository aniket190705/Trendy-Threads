const express = require("express");
const router = express.Router();
const addressController = require("../controller/address.controller.js");

// POST: Add new delivery address
router.post("/add", addressController.addAddress);

// (Optional) GET: Fetch all addresses for a user
router.get("/:userId", addressController.getUserAddresses);

router.delete("/:addressId", addressController.deleteAddress);

module.exports = router;
