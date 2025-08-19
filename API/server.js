const app = require('./index.js');
const connectDB = require('./src/config/db.js');

const PORT = 3000;
app.listen(PORT, async (req, res) => {
    await connectDB();
    console.log(`Server is running on https://localhost:${PORT}`);

    //https://trendy-threads-jsld.onrender.com
});


