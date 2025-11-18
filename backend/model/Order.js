const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const OrderSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    items: [OrderItemSchema],
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    delivery: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Processing', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    }
});

const OrderModel = mongoose.model("orders", OrderSchema);
module.exports = OrderModel;
