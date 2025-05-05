const app = require('./index.js');
const connectDB = require('./src/config/db.js');

const PORT = 5454;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on https://trendy-threads-jsld.onrender.com${PORT}`);
});


