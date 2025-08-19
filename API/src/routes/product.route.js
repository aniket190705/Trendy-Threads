const express = require("express");
const router = express.Router();

const productController = require('../controller/product.controller');

// router.post('/cart', cartController.createCart);
router.post('/:userId', productController.addProduct);
module.exports = router;