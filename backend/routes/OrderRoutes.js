const { createOrder, getUserOrders, getAllOrders } = require("../controller/OrderController");
const router = require("express").Router();

router.post("/create", createOrder);
router.get("/user/:email", getUserOrders);
router.get("/all", getAllOrders);

module.exports = router;
