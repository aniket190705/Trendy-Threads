const express = require('express');
const router = express.Router();

const cartItemsController = require('../controller/cartItems.controller');

// router.post('/cart', cartItemsController.createCart);
router.post('/', cartItemsController.createCartItems);
router.get('/:userId', cartItemsController.getCartItems);
router.post('/update', cartItemsController.updateCartItem);
router.delete('/delete/:itemId', cartItemsController.deleteCartItem);

module.exports = router;


