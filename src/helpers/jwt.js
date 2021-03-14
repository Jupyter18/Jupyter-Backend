const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt_secret;
const token_exp = config.token_exp;

const sign = (obj)=>{
    const token = jwt.sign(obj,secret,{expiresIn:token_exp});
    return token;
}

const verify = (token)=>{
    try{
         const obj = jwt.verify(token,secret);
         return obj;
    }
    catch(error){
        return {error};
    }  
}

module.exports = {sign, verify};