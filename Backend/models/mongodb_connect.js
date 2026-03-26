const mongoose = require('mongoose')
const dotenv=require('dotenv')
dotenv.config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb_url)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error.message)
        process.exit(1)  // stop server if DB fails
    }
}
module.exports = connectDB



