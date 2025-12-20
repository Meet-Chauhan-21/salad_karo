const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MembershipSchema = new Schema({
    planName: { type: String, required: true },
    planType: { type: String, enum: ['Starter', 'Popular', 'Elite'], required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    duration: { type: Number, required: true, default: 1 }, // months
    saladsPerWeek: { type: String, required: true },
    features: [{ type: String }],
    discount: { type: Number },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const MembershipModel = mongoose.model("memberships", MembershipSchema);
module.exports = MembershipModel;
