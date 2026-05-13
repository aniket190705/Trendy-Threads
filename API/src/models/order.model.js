const mongoose = require("mongoose");

const orderItemSnapshotSchema = new mongoose.Schema({
    productId: {
        type: Number,
    },
    title: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
    },
    discountedPrice: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    color: {
        type: String,
    },
}, { _id: false });

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
        type: Object,
        required: true
    },
    items: {
        type: [orderItemSnapshotSchema],
        default: []
    },
    paymentDetails: {
        paymentMethod: {
            type: String,

        },
        transactionId: {
            type: String
        },
        paymentId: {
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
