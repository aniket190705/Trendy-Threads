const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Allow requests only from your frontend
    methods: "GET,POST,PUT,DELETE",  // Allow specific HTTP methods
    credentials: true                // Allow cookies if needed
}));

app.get('/', (req, res) => {
    res.send('Hello World');
});
const authRoute = require('./routes/auth.route.js');
app.use('/auth', authRoute);

const userRouters = require('./routes/user.route.js');
app.use('/api/users', userRouters);
module.exports = app;