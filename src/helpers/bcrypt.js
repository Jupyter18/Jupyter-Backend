const bcrypt = require('bcrypt');
const saltRound = require('../config').saltRound;

const genHash = async (password)=>{
    return await bcrypt.hash(password,saltRound);
}

const compare = async (password,hash)=>{
    return await bcrypt.compare(password,hash);
}

module.exports = {
    genHash,
    compare
}