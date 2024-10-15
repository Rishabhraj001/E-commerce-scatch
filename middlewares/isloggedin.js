const jwt = require("jsonwebtoken");
const user_model = require("../models/user_model");

module.exports = async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/");
    }
    
    try{
        
        let decoded = jwt.verify(req.cookies.token,"1234");
        let user = await user_model
          .findOne({email:decoded.email})
          .select("-password");
          req.user = user;
          next();
          
    } catch(err){
        req.flash("error","something went wrong" );
        res.redirect("/");
    }
};