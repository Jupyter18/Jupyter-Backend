const {executeSQL} = require('../../database');
const ApiError = require('../../helpers/ApiError')
const example_queries = require('../query_lib/example');

const getList = async (user) =>{
    try{
        const data_list = await executeSQL(user,example_queries.getList); 
        return data_list;
    }
    catch(e){
        return ApiError.badRequest(); //need to add sutable error 
    }
}

module.exports = {
    getList
}
    