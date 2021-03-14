const config = require('./config');
const startServer = require('./app');
const logger = require('./helpers/logger');

(async ()=>{
    const app = await startServer();
    
    app.listen(config.port, err => {
        if (err) {
            console.log(err);
            return;
        }
        logger.info(`Your server is ready on port ${config.port}`);
    });
})();