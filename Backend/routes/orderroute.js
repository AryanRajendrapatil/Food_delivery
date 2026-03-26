const express = require("express");
const { placeOrder, verifyOrder,getuserorder } = require("../controllers/ordercontroller.js");
const authMiddleware = require("../middleware/auth.js");

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, getuserorder);

module.exports = orderRouter;
