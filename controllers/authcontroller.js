const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken }= require("../utils/generatetoken");
module.exports.registerUser = async function(req,res){
    
    try{
        let {email , password , fullname}= req.body;
        let user = await userModel.findOne({email:email});
        if (user) return res.status(401).send("You have already have a account ,plaease login");


        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt, async function(err,hash){
                if(err) return res.send(err.message);
                else {let user = await userModel.create({
                        email,
                        password:hash,
                        fullname,
                    });
                    let token = generateToken;
                    res.cookie("token",token);
                    res.send("user created succesfully");
                }
            });
        });
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports.loginUser = async function (req,res){
    let {email,password}= req.body;
    let user = await userModel.findOne({email:email});
    if (!user) return res.send("Email or Password incorrect");

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = jwt.sign({ email: user.email }, "1234", { expiresIn: '1h' });
            res.cookie("token",token);
            res.redirect("/shop");

        }
        else{
            return res.send("Email or Password incorrect");
        }
    })
}

module.exports.logout = function(req,res){
    res.cookie("token","");
    res.redirect("/");
}