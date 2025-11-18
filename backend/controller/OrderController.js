const OrderModel = require("../model/Order");
const UserModel = require("../model/User");

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

        // Create delivery date (next day)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 1);

        // Create new order
        const newOrder = new OrderModel({
            userEmail,
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
