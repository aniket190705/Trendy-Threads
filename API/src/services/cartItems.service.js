
const Cart = require("../models/cart.model");
const CartItems = require("../models/cartItems.model")
// const Cart = require("../models/cart.model");
async function createCartItems({
    cart,
    size,
    quantity,
    price,
    discountedPrice,
    userId,

    title,
    description,
    discountPercent,
    imageUrl,
    color,
    productId
}) {
    try {
        const cartItem = new CartItems({
            cart: cart,
            size: size,
            quantity: quantity,
            price: price,
            discountedPrice: discountedPrice,
            userId: userId,

            title: title,
            description: description,
            discountPercent: discountPercent,
            imageUrl: imageUrl,
            color: color,
            productId: productId

        });
        await cartItem.save();

        await Cart.findByIdAndUpdate(
            cart,
            { $push: { cartItems: cartItem._id } },
            { new: true }
        );
        console.log("created cartItem: ", cartItem);
        return cartItem;
    }
    catch (err) {
        console.log("error in create cartItems: ", err);
        throw new Error(err.message);
    }
}



async function getCartItems(userId) {
    try {
        const cartItems = await CartItems.find({ userId: userId });
        console.log("cart items fetched: ", cartItems);
        return cartItems;
    } catch (err) {
        console.log("error in get cart items: ", err);
        throw new Error(err.message);
    }
}


const updateCartItem = async (userId, quantity, productId) => {
    try {
        // Find cart item by userId + productId
        const cartItem = await CartItems.findOne({ userId: userId, productId: productId });

        if (!cartItem) {
            return null; // item not found in cart
        }
        console.log("quantity:", quantity);
        // Update quantity
        cartItem.quantity = quantity;
        await cartItem.save();
        console.log("Updated cart item: ", cartItem);
        return cartItem;
    } catch (error) {
        console.error("Error in updateCartItem:", error);
        throw error;
    }
};

const deleteCartItem = async (itemId) => {
    try {
        const deletedItem = await CartItems.findByIdAndDelete(itemId);
        return deletedItem;
    } catch (error) {
        console.error("Error in deleteCartItem:", error);
        throw error;
    }
};

module.exports = {
    createCartItems,
    getCartItems,
    updateCartItem,
    deleteCartItem
};