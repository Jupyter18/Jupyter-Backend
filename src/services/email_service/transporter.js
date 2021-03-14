const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const config = require('../../config');
const loggers = require('../../helpers/logger');

const CLIENT_ID = config.mailer_client_id;
const CLIENT_SECRET = config.mailer_client_secret;
const REDIRECT_URL = config.mailer_redirect_url;
const REFRESH_TOKEN = config.mailer_refresh_token;
const EMAIL = config.email;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const templates = path.join(__dirname,'templates');
const options = {
    viewEngine: {
      partialsDir: templates,
      layoutsDir: templates,
      extname: ".hbs",
      defaultLayout : '',
    },
    extName: ".hbs",
    viewPath: templates
};

const transporter = async ()=>{
    try {
        const accessToken = await oAuth2Client.getAccessToken();
    
        const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
          },
        });

        transport.use('compile',hbs(options));
        return transport;
    } catch (error) {
        loggers.error(error)
        return error;
    }
}

module.exports = transporter;