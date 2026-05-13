const Cart = require("../models/cart.model");
const CartItems = require("../models/cartItems.model");
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

async function clearCart(userId) {
    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return null;
        }

        await CartItems.deleteMany({ cart: cart._id });

        cart.cartItems = [];
        cart.totalPrice = 0;
        cart.totalDiscountedPrice = 0;
        cart.discount = 0;
        cart.totalItem = 0;

        await cart.save();

        return cart;
    } catch (err) {
        console.log("error in clear cart: ", err);
        throw new Error(err.message);
    }
}


module.exports = {
    createCart,
    getCart,
    updateCart,
    clearCart
};
