const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.controller");

router.get("/user/:userId", orderController.getOrdersByUser);
router.get("/:orderId", orderController.getOrderById);
router.put("/:orderId/cancel", orderController.cancelOrder);

module.exports = router;
