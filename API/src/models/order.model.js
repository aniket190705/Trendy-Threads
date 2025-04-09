const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        // required: true
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItems',
        required: true
    }],

    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryDate: {
        type: Date,

    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        required: true
    },

    paymentDetails: {
        paymentMethod: {
            type: String,

        },
        transactionId: {
            type: String
        },
        paymentIds: {
            type: String
        },
        paymentStatus: {
            type: String,
            defuault: "pending"
        }
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
        default: 0
    },


    discount: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'pending'

    },
    totalItem: {
        type: Number,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;