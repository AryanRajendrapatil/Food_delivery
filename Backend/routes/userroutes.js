const express = require("express");
const {loginUser,registerUser} = require("../controllers/usercontroller");

const userRoutes = express.Router();

userRoutes.post("/register",registerUser);
userRoutes.post("/login",loginUser);

module.exports = userRoutes;
