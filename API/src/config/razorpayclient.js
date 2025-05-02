require('dotenv').config(); // must come first

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.APIKEY,       // should not be undefined
    key_secret: process.env.APISECRET
});

module.exports = razorpay;
