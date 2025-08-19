const productService = require('../services/product.service');
const addProduct = async (req, res) => {
    try {
        console.log("Product received: ", req.body);
        const product = await productService.addProduct(req.body);

        if (!product) {
            return res.status(400).send({ error: "Product not created" });
        }
        return res.status(201).send({ message: "Product created successfully", product });
    } catch (err) {
        console.log("Error in addProduct: ", err);
        return res.status(500).send({ error: err.message });
    }
}

module.exports = {
    addProduct
};