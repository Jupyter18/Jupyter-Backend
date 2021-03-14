
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
/**
 * All the express middlewares used in here
 * 
 * @param {app} app Express app
 * @return {app} 
 */
const expressLoader = async ({app})=>{
    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    return app;
}


module.exports = expressLoader;