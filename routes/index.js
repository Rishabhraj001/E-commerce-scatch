const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isloggedin");
const product_model = require('../models/product_model');
const user_model = require('../models/user_model');


router.get("/",function(req,res){
    let error = req.flash("error");
    res.render("index",{error,loggedin:false});
});

router.get("/cart",isloggedin,async function(req,res){
    let user = await user_model
    .findOne({email:req.user.email})
    .populate("cart");
    
    const bill =(Number(user.cart[0].price)+20)-Number(user.cart[0].discount);
    res.render("cart",{user,bill});
});
router.get("/addtocart/:productid",isloggedin,async function(req,res){
    
    let user = await user_model.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop");
});

router.get("/shop",isloggedin,async function(req,res){
    let products = await product_model.find();
    let success = req.flash("success");

    res.render("shop",{products,success});
});



module.exports = router;