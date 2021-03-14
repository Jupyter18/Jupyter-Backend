var mysql = require('mysql');
const config = require('../config');
const logger = require('../helpers/logger');

const dbConfig = {
    host : config.db_host,
    user : config.db_name_juser,
    password : config.db_password_juser,
    database : config.db_name,
    timezone: 'Z'
}

var pool  = mysql.createPool(dbConfig);

function executeSQL(user,sql,para){
    if(!user){
        throw {error:'User can not be null'}
    }
    return new Promise((res,rej)=>{
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            // not connected!

            //Switching users
            connection.changeUser(user, function(err) {
                if (err) throw err; 
            });

            // Use the connection
            connection.query(sql,para, function (error, results, fields) {

                // When done with the connection, release it.
                connection.release();
            
                // Handle error after the release.
                if (error){
                    rej({error});
                    return;
                }
                res(results);
            
                // Don't use the connection here, it has been returned to the pool.
            });
          });
    });
}

function executeTransaction(user,sql1,para1,sql2,para2){
    return new Promise((res,rej)=>{
        connection.beginTransaction(function(err) {
            if (err) { throw err; }

            //Switching users
            connection.changeUser({user : user}, function(err) {
                if (err) throw err;
            });

            connection.query(sql1, para1, function (error, results, fields) {
                if (error) {
                    return connection.rollback(function() {
                    throw error;
                    });
                }
            
                connection.query(sql2, para2, function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function() {
                            rej(error);
                        });
                    }
                    connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function() {
                                rej(err);
                            });
                        }
                        res('Succsess');
                    });
                });
            });
          });
    });
}

async function executeProcedure(user,procedure,args){
    try{
        const res = await executeSQL(user,`CALL ??(?)`,[procedure,args]);
        return res[0];
    }
    catch(error){
        logger.error(error)
        throw error.error
    }
}

async function executeFunction(user,func,args){
    try{
        const res = await executeSQL(user,`SELECT ??(?)`,[func,args]);
        return res[0];
    }
    catch(error){
        logger.error(error)
        throw error.error
    }
}

module.exports = {executeSQL,executeTransaction,executeProcedure,executeFunction};
