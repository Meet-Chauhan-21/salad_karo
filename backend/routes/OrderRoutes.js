const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require("../controller/OrderController");
const router = require("express").Router();

router.post("/create", createOrder);
router.get("/user/:email", getUserOrders);
router.get("/all", getAllOrders);
router.put("/update-status/:orderId", updateOrderStatus);

module.exports = router;
