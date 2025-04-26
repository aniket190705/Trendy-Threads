const Razorpay = require('razorpay');
const apiKey = "rzp_test_iEollpFXdcukRc"
const apiSecret = "2Vobq3oYybuzJHa6tHWKqEmU"
const razorpay = new Razorpay({
    key_id: apiKey,
    key_secret: apiSecret,
});

module.exports = razorpay;