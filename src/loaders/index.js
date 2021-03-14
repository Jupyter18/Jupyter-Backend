const expressLoader = require('./express');
const databaseLoader = require('./database');

/** Loader used to reduce the code complexity in app.js
 * 
 * 
 * @param {Object} expressApp Express app passed as a parameter 
 * @return {void}
 */

const loaders = async ({ expressApp }) => {
    await expressLoader({ app: expressApp });

    await databaseLoader();

    // ... more loaders can be here

    // ... Initialize agenda
    // ... or Redis, or whatever you want
}

module.exports = loaders;