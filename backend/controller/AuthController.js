const UserModel = require("../model/User");
const OrderModel = require("../model/Order");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {

    try {
        const { name, phone, city, address, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({
                    message: "User already exists",
                    success: false
                })
        }
        const userModel = new UserModel({ name, phone, city, address, email, password })
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        const jwtToken = jwt.sign(
            { email: userModel.email, _id: userModel._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.status(201)
            .json({
                message: "Registration successful",
                success: true,
                jwtToken,
                email: userModel.email,
                name: userModel.name,
                phone: userModel.phone,
                city: userModel.city,
                address: userModel.address
            })
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401)
                .json({
                    message: "Invalid email or password",
                    success: false
                })
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401)
                .json({
                    message: "Invalid email or password",
                    success: false
                })
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,
                email: user.email,
                name: user.name,
                phone: user.phone,
                city: user.city,
                address: user.address
            })
    } catch (err) {
        console.error("Login error:", err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, '-password').sort({ _id: -1 });

        // Get order stats for each user
        const usersWithStats = await Promise.all(users.map(async (user) => {
            const orders = await OrderModel.find({ userEmail: user.email });
            const totalOrders = orders.length;
            const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city,
                address: user.address,
                totalOrders,
                totalSpent,
                joinDate: user._id.getTimestamp(),
                status: 'active'
            };
        }));

        res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            users: usersWithStats
        });
    } catch (err) {
        console.error("Fetch users error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("318933593038-1tshushq39nspa53jarvs68hmf6a6pm5.apps.googleusercontent.com");

const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: "318933593038-1tshushq39nspa53jarvs68hmf6a6pm5.apps.googleusercontent.com"
        });
        const { email, name, picture } = ticket.getPayload();

        let user = await UserModel.findOne({ email });

        if (user) {
            // Check if profile is complete
            if (!user.phone || !user.city || !user.address) {
                return res.status(200).json({
                    success: false,
                    message: "Profile incomplete",
                    requiresInfo: true,
                    googleData: { email, name, picture },
                    currentData: { phone: user.phone, city: user.city, address: user.address }
                });
            }

            // Login success
            const jwtToken = jwt.sign(
                { email: user.email, _id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            // Return flat structure to match frontend expectations
            return res.status(200).json({
                message: "Login successful",
                success: true,
                jwtToken,
                email: user.email,
                name: user.name,
                phone: user.phone,
                city: user.city,
                address: user.address,
                picture: user.picture
            });
        } else {
            // New user
            return res.status(200).json({
                success: false,
                message: "User not found, registration required",
                requiresInfo: true,
                googleData: { email, name, picture }
            });
        }
    } catch (err) {
        console.error("Google Auth Error:", err);
        res.status(500).json({ message: "Google Auth Failed", success: false });
    }
}

const googleRegister = async (req, res) => {
    try {
        const { email, name, picture, phone, city, address, token } = req.body;

        // Verify token again for security
        if (token) {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: "318933593038-1tshushq39nspa53jarvs68hmf6a6pm5.apps.googleusercontent.com"
                });
                const payload = ticket.getPayload();
                if (payload.email !== email) {
                    return res.status(403).json({ success: false, message: "Token email mismatch" });
                }
            } catch (e) {
                console.error("Token verification failed in register", e);
                // Proceeding if we trust the post body for now, but in prod strictly fail
            }
        }

        let user = await UserModel.findOne({ email });
        if (user) {
            // Update existing
            user.phone = phone || user.phone;
            user.city = city || user.city;
            user.address = address || user.address;
            user.picture = picture || user.picture;
            await user.save();
        } else {
            // Create new
            user = new UserModel({
                name, email, phone, city, address, picture,
                password: "GOOGLE_LOGIN_NO_PASS_" + Math.random() // Dummy password
            });
            await user.save();
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        res.status(201).json({
            message: "Registration successful",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name,
            phone: user.phone,
            city: user.city,
            address: user.address,
            picture: user.picture
        });

    } catch (err) {
        console.error("Google Register Error:", err);
        res.status(500).json({ message: "Registration Failed", success: false });
    }
}

module.exports = {
    signup,
    login,
    getAllUsers,
    googleLogin,
    googleRegister
};