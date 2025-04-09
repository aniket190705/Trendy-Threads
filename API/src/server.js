const app = require('./index.js');
const connectDB = require('./config/db.js');

const PORT = 5454;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});


