const cartSevice = require('../services/cart.service');

const updateCart = async (req, res) => {
    try {
        const { userId, cartItems, totalPrice, totalDiscountedPrice } = req.body;
        // console.log("Updating cart for user: ", userId);

        // Assuming cartItems is an array of item IDs
        const updatedCart = await cartSevice.updateCart(userId, cartItems, totalPrice, totalDiscountedPrice);

        if (!updatedCart) {
            return res.status(404).send({ error: "Cart not found or update failed" });
        }

        return res.status(200).send({ message: "Cart updated successfully", cart: updatedCart });
    } catch (err) {
        console.log("Error updating cart: ", err);
        return res.status(500).send({ error: err.message });
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        // console.log("Fetching cart for user: ", userId);

        const cart = await cartSevice.getCart(userId)
        if (!cart) {
            return res.status(404).send({ error: "Cart not found" });
        }

        return res.status(200).send(cart);
    } catch (err) {
        console.log("Error fetching cart: ", err);
        return res.status(500).send({ error: err.message });
    }
}

module.exports = {

    updateCart,
    getCart
}