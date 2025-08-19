const express = require('express');
const router = express.Router();

const cartController = require('../controller/cart.controller');

// router.post('/cart', cartController.createCart);
router.get('/:userId', cartController.getCart);
router.put('/updatecart', cartController.updateCart);

module.exports = router;


