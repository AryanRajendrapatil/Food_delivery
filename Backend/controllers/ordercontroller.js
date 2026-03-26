const OrderModel = require("../models/ordermodel");
const userModel = require("../models/usermodel");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const placeOrder = async (req, res) => {
    try {
        const {userId,items,amount,address} = req.body;
        const neworder = new OrderModel({
            userId,
            items,
            amount,
            address
        });
        await neworder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        const line_items = items.map((item)=>{
            return {
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100*80
                },
                quantity:item.quantity
            }  
        })
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `http://localhost:5173/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `http://localhost:5173/verify?success=false&orderId=${neworder._id}`
        })
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await OrderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid successfully" });
        } else {
            await OrderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error verifying order" });
    }
}

const getuserorder = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.body.userId });
        res.json({ success: true,data:orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error getting orders" });
    }
}

module.exports = { placeOrder, verifyOrder,getuserorder }
