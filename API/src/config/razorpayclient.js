require('dotenv').config(); // must come first

const Razorpay = require('razorpay');

const keyId = process.env.APIKEY;
const keySecret = process.env.APISECRET || process.env.APISECRECT;

if (!keyId || !keySecret) {
    throw new Error(
        "Razorpay credentials are missing. Set APIKEY and APISECRET in API/.env"
    );
}

const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret
});

module.exports = razorpay;
