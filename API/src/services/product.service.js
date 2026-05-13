const Product = require("../models/product.model");

const addProduct = async (product) => {
    const {
        title,
        price,
        description,
        imageUrl,
        discountedPrice,
        quantity,
        discountPercent,
        brand,
        color,
        size
    } = product;

    try {
        const newProduct = new Product({
            title,
            description,
            price,
            discountedPrice,
            discountPercent,
            quantity,
            imageUrl,
            brand,
            color,
            size
        });

        await newProduct.save();
        return newProduct;
    } catch (error) {
        console.error("Error adding product:", error);
        throw new Error("Internal server error");
    }
};

const getAllProducts = async () => {
    try {
        return await Product.find().sort({ createdAt: -1 });
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Internal server error");
    }
};

const getProductById = async (productId) => {
    try {
        return await Product.findById(productId);
    } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Internal server error");
    }
};

const updateProduct = async (productId, updates) => {
    try {
        return await Product.findByIdAndUpdate(productId, updates, {
            new: true,
            runValidators: true
        });
    } catch (error) {
        console.error("Error updating product:", error);
        throw new Error("Internal server error");
    }
};

const deleteProduct = async (productId) => {
    try {
        return await Product.findByIdAndDelete(productId);
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Internal server error");
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
