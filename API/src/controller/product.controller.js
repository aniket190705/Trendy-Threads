const productService = require("../services/product.service");
const {
    redisClient,
    PRODUCT_CACHE_TTL_SECONDS
} = require("../config/redis");

const PRODUCT_LIST_CACHE_KEY = "products:list";

const getProductCacheKey = (productId) => `products:${productId}`;

const isCacheReady = () => redisClient.isReady;

const getCachedValue = async (key) => {
    if (!isCacheReady()) {
        return null;
    }

    try {
        return await redisClient.get(key);
    } catch (error) {
        console.error("Redis read failed:", error.message);
        return null;
    }
};

const setCachedValue = async (key, value) => {
    if (!isCacheReady()) {
        return;
    }

    try {
        await redisClient.set(key, JSON.stringify(value), {
            EX: PRODUCT_CACHE_TTL_SECONDS
        });
    } catch (error) {
        console.error("Redis write failed:", error.message);
    }
};

const invalidateProductCache = async (productId) => {
    if (!isCacheReady()) {
        return;
    }

    try {
        // Cache invalidation: remove stale list and detail entries after data changes.
        const keysToDelete = [PRODUCT_LIST_CACHE_KEY];

        if (productId) {
            keysToDelete.push(getProductCacheKey(productId));
        }

        await redisClient.del(keysToDelete);
    } catch (error) {
        console.error("Redis delete failed:", error.message);
    }
};

const addProduct = async (req, res) => {
    try {
        console.log("Product received: ", req.body);
        const product = await productService.addProduct(req.body);

        if (!product) {
            return res.status(400).send({ error: "Product not created" });
        }

        await invalidateProductCache(product._id.toString());

        return res
            .status(201)
            .send({ message: "Product created successfully", product });
    } catch (err) {
        console.log("Error in addProduct: ", err);
        return res.status(500).send({ error: err.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const cachedProducts = await getCachedValue(PRODUCT_LIST_CACHE_KEY);

        if (cachedProducts) {
            // Cache hit: return the Redis copy and skip MongoDB.
            return res.status(200).send(JSON.parse(cachedProducts));
        }

        const products = await productService.getAllProducts();
        const response = { products };

        // Cache miss: query MongoDB, then store the response in Redis for the next request.
        await setCachedValue(PRODUCT_LIST_CACHE_KEY, response);

        return res.status(200).send(response);
    } catch (err) {
        console.log("Error in getAllProducts: ", err);
        return res.status(500).send({ error: err.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const productCacheKey = getProductCacheKey(productId);
        const cachedProduct = await getCachedValue(productCacheKey);

        if (cachedProduct) {
            // Cache hit: return the Redis copy and skip MongoDB.
            return res.status(200).send(JSON.parse(cachedProduct));
        }

        const product = await productService.getProductById(productId);

        if (!product) {
            return res.status(404).send({ error: "Product not found" });
        }

        const response = { product };

        // Cache miss: query MongoDB, then store the response in Redis for the next request.
        await setCachedValue(productCacheKey, response);

        return res.status(200).send(response);
    } catch (err) {
        console.log("Error in getProductById: ", err);
        return res.status(500).send({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);

        if (!product) {
            return res.status(404).send({ error: "Product not found" });
        }

        await invalidateProductCache(product._id.toString());

        return res.status(200).send({
            message: "Product updated successfully",
            product
        });
    } catch (err) {
        console.log("Error in updateProduct: ", err);
        return res.status(500).send({ error: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);

        if (!product) {
            return res.status(404).send({ error: "Product not found" });
        }

        await invalidateProductCache(product._id.toString());

        return res.status(200).send({
            message: "Product deleted successfully",
            product
        });
    } catch (err) {
        console.log("Error in deleteProduct: ", err);
        return res.status(500).send({ error: err.message });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
