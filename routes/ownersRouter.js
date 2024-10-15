const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner_model");



router.post("/create",async function(req,res){
    let owners = await ownerModel.find();
    if(owners.length>0){
        return res
    .status(502)
    .send("You dont have a permission to create a owner");
    }
    let {fullname,email,password}=req.body;
    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,

    });
    
    res.status(201).send(createdOwner);

});
router.get("/admin",function(req,res){
    let success = req.flash("success");
    res.render("createproducts",{success});
});

module.exports = router;