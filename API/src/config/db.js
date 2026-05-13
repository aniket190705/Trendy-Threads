const mongoose = require("mongoose");

const mongodbUrl =
    process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/trendythreads";

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

module.exports = connectDB;
