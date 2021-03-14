const config = require('./config');
const loaders = require('./loaders');
const express = require('express');
const routes = require('./routes');
const apiErrorHandler = require('./middlewares/apiErrorHandler');
const auth = require('./middlewares/auth');

async function startServer() {

    const app = express();
    //loading init middlewares
    await loaders({ expressApp: app });
    
    //Authentication
    app.use(auth);

    //handle routes
    routes.endPointsHandler(app);
    
    //Error handling middleware
    app.use(apiErrorHandler);

    return app;
}

module.exports = startServer;