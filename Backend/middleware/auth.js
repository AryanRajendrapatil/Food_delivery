const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");
const dotenv = require("dotenv");
dotenv.config();


const authMiddleware = async (req,res,next) => {
    try {
        const token = req.headers.token;
        if(!token){
            return res.json({success:false,message:"Not authorized"})
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

module.exports = authMiddleware