const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    // product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'products',
    //     required: true
    // },
    // size: {
    //     type: Number,
    //     required: true
    // },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discountPercent: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
});

const CartItem = mongoose.model("cartItems", cartItemsSchema);
module.exports = CartItem;