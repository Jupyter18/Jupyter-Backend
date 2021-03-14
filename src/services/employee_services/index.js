const ApiError = require('../../helpers/ApiError');
const LeaveAplication = require('../../models/leaveApplication');
const {fixedLeaveService,approvedLeaveService,appliedLeaveService} = require('./leave');
const {executeProcedure,executeFunction,executeSQL} = require('../../database');
const viewLeave = require('../query_lib/leave_query');

const leaveStatus = new Map([
    ['null', 'pending'],
    ['0', 'rejected'],
    ['1', 'approved'],
  ]);

const addLeaveService = async (body,user)=>{
    if(!user) throw ApiError.unauthorized();
    try{
        const data = await executeFunction(user,'leave_insert',Object.values(body));
        return Object.values(data);
    }
    catch(e){
        if(e.errno == 1452){
            throw ApiError.serverError('Foreign Key Constraint Error');//this can be removed 
        }
        if(e.errno == 1062){
            throw ApiError.serverError('Duplicate Error');//this can be removed 
        }
        throw ApiError.serverError('Error occured in view profile procedure');
    }
}

const viewProfileService = async (empid,user)=>{
    if(!user) throw ApiError.unauthorized();
    try{
        const data = await executeProcedure(user,'GetEmp_profile',empid);
        return data;
    }
    catch(e){
        throw ApiError.serverError('Error occured in view profile procedure');
    }
   
}

const leaveSummaryService = async (empid,user)=>{
    if(!user) throw ApiError.unauthorized();
    const fixed = await fixedLeaveService(empid, user);

    const approved = await approvedLeaveService(empid, user);
    
    const applied = await appliedLeaveService(empid, user);

    const allLeaves = {fixed , approved , applied}
    return allLeaves;
   
}

const leaveHistoryService = async (empid,user)=>{
    if(!user) throw ApiError.unauthorized();
    const query = viewLeave.leaveHistory;
    try{
        const data = await executeSQL(user, query,[empid]);
        const stat = JSON.parse(JSON.stringify(data));
       
        stat.forEach((element) => {
            element.is_approved = leaveStatus.get(`${element.is_approved}`);
        });

        return stat;
    }
    catch(e){
        console.log(e);
        throw ApiError.unprocessableEntity(res.error);
    }
}

module.exports = {
    addLeaveService,
    viewProfileService,
    leaveSummaryService,
    leaveHistoryService,
}