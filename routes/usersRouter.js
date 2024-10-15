const express = require('express');
const router = express.Router();
const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken }= require("../utils/generatetoken");
const { registerUser , loginUser ,logout } = require('../controllers/authcontroller');

router.get("/",function(req,res){
    res.send("hey its working");
});
router.post("/register", registerUser);

router.post("/login",loginUser);

router.get("/logout",logout);

module.exports = router;