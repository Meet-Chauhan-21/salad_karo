const UserModel = require("../model/User");
const OrderModel = require("../model/Order");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signup = async (req,res)=>{

    try{
        const {name,phone,city,address,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({
                    message: "User already exists",
                    success: false
                })
        }
        const userModel = new UserModel({name,phone,city,address,email,password})
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        
        const jwtToken = jwt.sign(
            {email: userModel.email,_id: userModel._id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
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
    } catch(err) {
        console.error("Signup error:", err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            }) 
    }

}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(401)
                .json({
                    message: "Invalid email or password",
                    success: false
                })
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(401)
                .json({
                    message: "Invalid email or password",
                    success: false
                })
        }

        const jwtToken = jwt.sign(
            {email: user.email,_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
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
    } catch(err) {
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

module.exports = {
    signup,
    login,
    getAllUsers
};