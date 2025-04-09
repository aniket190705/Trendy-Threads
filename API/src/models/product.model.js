const mongoose = require('mongoose');
const { create } = require('./orderItems.model');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    discountPercent: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    brand: {
        type: String,

    },
    color: {
        type: String,
    },
    size: [{
        name: { type: String },
        quantity: {
            type: Number,
        }
    }],

    imageUrl: {
        type: String,
        required: true
    },

    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ratings',
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews',
    }],
    numRatings: [{
        type: Number,
        default: 0
    }],

    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Product = mongoose.model('products', productSchema);
module.exports = Product;