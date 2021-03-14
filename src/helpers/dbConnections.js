const config = require('../config');

const adminDB = {
    user : config.db_name_jadmin,
    password : config.db_password_jadmin
};
const superDB = {
    user : config.db_name_jsuper,
    password : config.db_password_jsuper
};
const hrmDB = {
    user : config.db_name_jhrm,
    password : config.db_password_jhrm
};
const empDB = {
    user : config.db_name_jemp,
    password : config.db_password_jemp
};

const userDB = {
    user : config.db_name_juser,
    password : config.db_password_juser
}

module.exports = {adminDB,superDB,hrmDB,empDB,userDB}