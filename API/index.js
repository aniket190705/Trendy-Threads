const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://trendy-threads-sigma.vercel.app", "http://localhost:5173"], // Allow requests only from your frontend
    methods: "GET,POST,PUT,DELETE",  // Allow specific HTTP methods
    credentials: true                // Allow cookies if needed
}));
// app.use(cors({
//     origin: ["http://localhost:3000"], // or "*" for all origins in dev
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true
// })
// )

app.get('/', (req, res) => {
    res.send('Hello World');
});
const authRoute = require('./src/routes/auth.route.js');
app.use('/auth', authRoute);

const userRouters = require('./src/routes/user.route.js');
app.use('/api/users', userRouters);

const paymentRouter = require("./src/routes/payments.routes.js")
app.use("/api/payments", paymentRouter)

const cartRouter = require("./src/routes/cart.route.js");
app.use("/api/cart", cartRouter);

const cartItemsRouter = require("./src/routes/cartItems.route.js");
app.use("/api/cartitems", cartItemsRouter);

const productRouter = require("./src/routes/product.route.js");
app.use("/api/products", productRouter);

const addressRouter = require("./src/routes/address.route");
app.use("/api/address", addressRouter);

module.exports = app;
