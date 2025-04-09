const Cart = require("../models/cart.model");
async function createCart(user) {
    try {
        const cart = new Cart({ user });
        await cart.save();
        console.log("created cart ", cart);
        return cart;
    }
    catch (err) {
        throw new Error(err.message);
    }
}
module.exports = {
    createCart
};