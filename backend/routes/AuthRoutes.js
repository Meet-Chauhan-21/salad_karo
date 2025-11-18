const { signup, login, getAllUsers } = require("../controller/AuthController")
const { updateProfile } = require("../controller/ProfileController")
const router = require("express").Router();

router.post("/login", login)

router.post("/signup", signup)

router.put("/update-profile", updateProfile)

router.get("/users", getAllUsers)

module.exports = router