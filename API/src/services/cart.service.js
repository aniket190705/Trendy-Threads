const Cart = require("../models/cart.model");
async function createCart(user) {
    try {
        const cart = new Cart({
            user: user
        });
        await cart.save();
        console.log("created cart ", cart);
        return cart;
    }
    catch (err) {
        console.log("error in create cart: ", err);
        throw new Error(err.message);
    }
}

async function getCart(userId) {
    try {
        const cart = await Cart.findOne({ user: userId }).populate("cartItems");
        return cart;
    } catch (err) {
        console.log("error in get cart: ", err);
        throw new Error(err.message);
    }
}

async function updateCart(userId, cartItems, totalPrice, totalDiscountedPrice) {
    try {
        const discount = totalPrice - totalDiscountedPrice;

        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $set: {
                    cartItems,
                    totalPrice,
                    totalDiscountedPrice,
                    discount,
                    totalItem: cartItems.length
                }
            },
            { new: true, upsert: true, runValidators: true }
        ).populate("cartItems"); // 👈 populate product details

        console.log("Updated cart: ", cart);
        return cart;
    } catch (err) {
        console.log("error in update cart: ", err);
        throw new Error(err.message);
    }
}


module.exports = {
    createCart,
    getCart,
    updateCart
};