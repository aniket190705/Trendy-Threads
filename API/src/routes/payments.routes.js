const express = require('express');
const router = express.Router();

const paymentController = require("../controller/payment.controller.js")
const orderController = require("../controller/order.controller.js")

router.post("/paymentlink/:id", paymentController.createPaymentLink)
router.post("/updateinfo", paymentController.updatePaymentInformation)
router.post("/createOrder", orderController.createOrder)
router.post("/getorderid", orderController.getOrderId)
module.exports = router;
