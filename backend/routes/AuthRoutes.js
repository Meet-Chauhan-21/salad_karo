const { signup, login, getAllUsers, googleLogin, googleRegister } = require("../controller/AuthController")
const { updateProfile } = require("../controller/ProfileController")
const router = require("express").Router();

router.post("/login", login)
router.post("/google-login", googleLogin)

router.post("/signup", signup)
router.post("/google-register", googleRegister)

router.put("/update-profile", updateProfile)

router.get("/users", getAllUsers)

module.exports = router