const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    fullname: String,
    email : String,
    password: String,
    cart: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],
    isAdmin:Boolean,
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture : String,

})
module.exports = mongoose.models.user || mongoose.model('user', userSchema)