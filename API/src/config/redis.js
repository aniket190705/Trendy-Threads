const { createClient } = require("redis");

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const PRODUCT_CACHE_TTL_SECONDS = 300;

const redisClient = createClient({
    url: redisUrl,
});

redisClient.on("error", (error) => {
    console.error("Redis error:", error.message);
});

const connectRedis = async () => {
    if (redisClient.isOpen) {
        return;
    }

    try {
        await redisClient.connect();
        console.log("Redis connected successfully");
    } catch (error) {
        console.warn(
            "Redis connection failed. The app will keep running without cache.",
            error.message
        );
    }
};

module.exports = {
    redisClient,
    connectRedis,
    PRODUCT_CACHE_TTL_SECONDS,
};
