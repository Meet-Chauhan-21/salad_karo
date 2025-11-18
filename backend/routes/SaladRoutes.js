const { getAllSalads, createSalad, updateSalad, deleteSalad, toggleSaladStatus } = require("../controller/SaladController");
const router = require("express").Router();

router.get("/all", getAllSalads);
router.post("/create", createSalad);
router.put("/update/:saladId", updateSalad);
router.delete("/delete/:saladId", deleteSalad);
router.put("/toggle-status/:saladId", toggleSaladStatus);

module.exports = router;
