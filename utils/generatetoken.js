const jwt = require("jsonwebtoken"); 
const generateToken = (user)=>{
    return jwt.sign({ email: user.email }, "1234", { expiresIn: '1h' });
    
};


module.exports = generateToken;