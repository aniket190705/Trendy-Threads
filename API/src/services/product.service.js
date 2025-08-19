const Product = require("../models/product.model");

const addProduct = async (product) => {
    const { title, price, description, imageUrl, discountedPrice, quantity, discountPercent } = product;

    try {
        const newProduct = new Product({
            title,
            description,
            price,
            discountedPrice,
            discountPercent,
            quantity,
            imageUrl,

        });

        await newProduct.save();
        return newProduct;
    } catch (error) {
        console.error("Error adding product:", error);
        throw new Error("Internal server error");
    }
};

module.exports = {
    addProduct
};