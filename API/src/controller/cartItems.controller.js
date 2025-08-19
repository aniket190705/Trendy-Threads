const cartItemsService = require('../services/cartItems.service');

const createCartItems = async (req, res) => {
    try {
        const { cart, size, quantity, price, discountedPrice, userId, product, title, description, discountPercent, imageUrl, color, productId } = req.body;
        // console.log("Creating cart item with data: ", req.body);
        // console.log("Creating cart for user: ", userId);

        const newCartItem = await cartItemsService.createCartItems({
            cart,
            size,
            product,
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

        });

        if (!newCartItem) {
            return res.status(404).send({ error: "Failed to create cart item" });
        }

        return res.status(200).send({ message: "Cart item created successfully", cartItem: newCartItem });
    } catch (err) {
        console.log("Error creating cart item: ", err);
        return res.status(500).send({ error: err.message });
    }


}

const getCartItems = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cartItems = await cartItemsService.getCartItems(userId);
        return res.status(200).send({ cartItems });
    } catch (err) {
        console.log("Error fetching cart items: ", err);
        return res.status(500).send({ error: err.message });
    }
};



const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const updatedItem = await cartItemsService.updateCartItem(userId, quantity, productId);


        if (!updatedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ cartItem: updatedItem });
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const deletedItem = await cartItemsService.deleteCartItem(itemId);

        if (!deletedItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createCartItems,
    getCartItems,
    updateCartItem,
    deleteCartItem
};