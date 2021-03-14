const ApiError = require('../../helpers/ApiError');
const {executeSQL} = require('../../database');
const viewLeave = require('../query_lib/leave_query');

const fixedLeaveService = async (empid,user)=>{
    const query = viewLeave.fixedLeave;
    try{
        const data = await executeSQL(user, query,[empid]);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.unprocessableEntity(res.error);
    }
}

const approvedLeaveService = async (empid,user)=>{
    const query = viewLeave.approvedLeave;
    try{
        const data = await executeSQL(user, query,[empid]);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.unprocessableEntity(res.error);
    }
}
const appliedLeaveService = async (empid,user)=>{
    const query = viewLeave.appliedLeave;
    try{
        const data = await executeSQL(user, query,[empid]);
        return data;
    }
    catch(e){
        console.log(e);
        throw ApiError.unprocessableEntity(res.error);
    }
}





module.exports = {
    fixedLeaveService,
    approvedLeaveService,
    appliedLeaveService,
}