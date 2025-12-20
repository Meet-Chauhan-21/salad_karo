const OrderModel = require("../model/Order");
const UserModel = require("../model/User");
const MembershipModel = require("../model/Membership");

const createOrder = async (req, res) => {
    try {
        const { userEmail, items, subtotal, tax, delivery, total } = req.body;

        // Validate required fields
        if (!userEmail || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Invalid order data",
                success: false
            });
        }

        // Get user details from database
        const user = await UserModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Check if any item is a membership plan
        for (const item of items) {
            if (item.productId) {
                try {
                    const membershipPlan = await MembershipModel.findById(item.productId);

                    if (membershipPlan) {
                        // User purchased a membership
                        const startDate = new Date();
                        const endDate = new Date(startDate);
                        const durationMonths = membershipPlan.duration || 1;
                        endDate.setMonth(endDate.getMonth() + durationMonths);

                        user.membership = membershipPlan._id;
                        user.membershipStartDate = startDate;
                        user.membershipEndDate = endDate;
                        user.membershipStatus = 'Active';
                        user.ordersUsed = 0; // Reset orders/salads used count

                        await user.save();
                        console.log(`Updated user ${userEmail} with membership ${membershipPlan.planName}`);
                    }
                } catch (err) {
                    console.log(`Item ${item.productId} is not a membership plan or valid ID:`, err.message);
                    // Continue processing order even if membership lookup fails (it might just be a regular salad)
                }
            }
        }

        // Create delivery date (next day)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 1);

        // Create new order with user details
        const newOrder = new OrderModel({
            userEmail,
            userName: user.name,
            userPhone: user.phone,
            items,
            subtotal,
            tax,
            delivery,
            total,
            deliveryDate
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order created successfully",
            success: true,
            order: newOrder
        });
    } catch (err) {
        console.error("Order creation error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            });
        }

        const orders = await OrderModel.find({ userEmail: email }).sort({ orderDate: -1 });

        res.status(200).json({
            message: "Orders fetched successfully",
            success: true,
            orders
        });
    } catch (err) {
        console.error("Fetch orders error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().sort({ orderDate: -1 });

        // Populate user data for each order
        const ordersWithUserData = await Promise.all(
            orders.map(async (order) => {
                const user = await UserModel.findOne({ email: order.userEmail });
                return {
                    ...order.toObject(),
                    userName: user ? user.name : 'N/A',
                    userPhone: user ? user.phone : 'N/A'
                };
            })
        );

        res.status(200).json({
            message: "All orders fetched successfully",
            success: true,
            orders: ordersWithUserData
        });
    } catch (err) {
        console.error("Fetch all orders error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({
                message: "Order ID and status are required",
                success: false
            });
        }

        // Validate status value
        const validStatuses = ['Processing', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value",
                success: false
            });
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            success: true,
            order: updatedOrder
        });
    } catch (err) {
        console.error("Update order status error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
};
