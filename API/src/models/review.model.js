const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    createdAt: {    // Date of review
        type: Date,
        default: Date.now()
    },

})

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;