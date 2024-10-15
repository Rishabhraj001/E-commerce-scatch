const express = require('express');
const router = express.Router();
const productModel = require("../models/product_model");

const upload = require("../config/multer-config");

router.post("/create",upload.single("image"),async function(req,res){
    let {name,price,discount,bgcolor,panelcolor,textcolor} = req.body;
    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,

    });
    req.flash("success","product Created Succesfully")
    res.redirect("/owners/admin");
});

module.exports = router;