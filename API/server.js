require("dotenv").config();

const app = require("./index.js");
const connectDB = require("./src/config/db.js");
const { connectRedis } = require("./src/config/redis.js");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();


