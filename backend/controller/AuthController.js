const UserModel = require("../model/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signup = async (req,res)=>{

    try{
        const {name,phone,city,address,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({
                    message: "user already exiest",
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
                message: "signup successfully",
                success: true,
                jwtToken,
                email: userModel.email,
                name: userModel.name
            }) 
    } catch(err) {
        res.status(500)
            .json({
                message: "internal server error",
                success: false
            }) 
    }

}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(409)
                .json({
                    message: "user not exiest",
                    success: false
                })
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(409)
                .json({
                    message: "user not exiest",
                    success: false
                })
        }

        const jwtToken = jwt.sign(
            {email: user.email,_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )

        res.status(201)
            .json({
                message: "login successfully",
                success: true,
                jwtToken,
                email,
                name:user.name
            }) 
    } catch(err) {
        res.status(500)
            .json({
                message: "internal server error",
                success: false
            }) 
    }
}

module.exports = {
    signup,
    login
}