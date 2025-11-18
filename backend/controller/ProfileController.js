const UserModel = require("../model/User");

const updateProfile = async (req, res) => {
    try {
        const { email, name, city, address } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            });
        }

        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update fields
        if (name) user.name = name;
        if (city) user.city = city;
        if (address) user.address = address;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: {
                email: user.email,
                name: user.name,
                phone: user.phone,
                city: user.city,
                address: user.address
            }
        });
    } catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    updateProfile
};
