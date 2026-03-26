const express = require("express");
const {addtocart,getcart,removefromcart} = require("../controllers/cartcontroller");
const cartrouter = express.Router();
const authMiddleware = require("../middleware/auth");

cartrouter.post("/add",authMiddleware,addtocart);
cartrouter.post("/get",authMiddleware,getcart);
cartrouter.post("/remove",authMiddleware,removefromcart);

module.exports = cartrouter;