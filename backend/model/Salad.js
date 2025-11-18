const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaladSchema = new Schema({
    name: {
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
    originalPrice: {
        type: Number
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 5
    },
    reviews: {
        type: Number,
        default: 0
    },
    badge: {
        type: String
    },
    category: {
        type: String,
        default: 'Classic'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const SaladModel = mongoose.model("salads", SaladSchema);
module.exports = SaladModel;
