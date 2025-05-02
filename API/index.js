const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://trendy-threads-sigma.vercel.app/", // Allow requests only from your frontend
    methods: "GET,POST,PUT,DELETE",  // Allow specific HTTP methods
    credentials: true                // Allow cookies if needed
}));

app.get('/', (req, res) => {
    res.send('Hello World');
});
const authRoute = require('./src/routes/auth.route.js');
app.use('/auth', authRoute);

const userRouters = require('./src/routes/user.route.js');
app.use('/api/users', userRouters);


const paymentRouter = require("./src/routes/payments.routes.js")
app.use("/api/payments", paymentRouter)

module.exports = app;