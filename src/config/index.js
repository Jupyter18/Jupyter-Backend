const dotenv = require('dotenv');

const result = dotenv.config();

if(result.error) throw result.error;

const config = {
    domain: process.env.HOST_DOMAIN || '127.0.0.1',
    port: process.env.PORT || '4000',

    saltRound : parseInt(process.env.SALT),
    token_exp : process.env.TOKEN_EXP,
    jwt_secret : process.env.JWT_SECRECT,
    
    env: process.env.NODE_ENV || 'development',
    log: {
        level: process.env.LOG_LEVEL || 'info',
    },

    db_name : process.env.DB_NAME,
    db_host : process.env.DB_HOST,
    db_userName : process.env.DB_USER_NAME,
    db_password : process.env.DB_PASSWORD,
    db_dialect : process.env.DB_DIALECT,

    db_name_juser : process.env.DB_USER_NAME_JUSER,
    db_password_juser : process.env.DB_PASSWORD_JUSER ,

    db_name_jadmin : process.env.DB_USER_NAME_JADMIN,
    db_password_jadmin : process.env.DB_PASSWORD_JADMIN,

    db_name_jsuper : process.env.DB_USER_NAME_JSUPER,
    db_password_jsuper : process.env.DB_PASSWORD_JSUPER,

    db_name_jemp : process.env.DB_USER_NAME_JEMP,
    db_password_jemp : process.env.DB_PASSWORD_JEMP,

    db_name_jhrm : process.env.DB_USER_NAME_JHRM,
    db_password_jhrm : process.env.DB_PASSWORD_JHRM,
    
    react_url : process.env.REACT_URL,

    mailer_client_id : process.env.CLIENT_ID,
    mailer_client_secret : process.env.CLIENT_SECRET,
    mailer_redirect_url : process.env.REDIRECT_URL,
    mailer_refresh_token : process.env.REFRESH_TOKEN,
    email : process.env.EMAIL,
};

module.exports = config;