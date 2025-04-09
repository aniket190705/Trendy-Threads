const mongoose = require("mongoose");

const mongodbUrl = "mongodb+srv://aniket190705:6NdVDHi%25%40YwknUt@cluster0.rjmrj.mongodb.net/myDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
