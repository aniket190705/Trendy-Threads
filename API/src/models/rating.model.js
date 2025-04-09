const mongoose = require('mongoose');
const { create } = require('./orderItems.model');
const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {    // Date of rating
        type: Date,
        default: Date.now()
    },

})

const Rating = mongoose.model('ratings', ratingSchema);
module.exports = Rating;