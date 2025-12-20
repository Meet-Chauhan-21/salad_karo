const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    membership: {
        type: Schema.Types.ObjectId,
        ref: "memberships",
        required: false
    },
    membershipStartDate: {
        type: Date,
        required: false
    },
    membershipEndDate: {
        type: Date,
        required: false
    },
    membershipStatus: {
        type: String,
        enum: ['Active', 'Expired', 'Cancelled', 'None'],
        default: 'None'
    },
    ordersUsed: {
        type: Number,
        default: 0
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel