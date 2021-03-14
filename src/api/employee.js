const {addLeaveValidation} = require('../helpers/validation_employee')
const ApiError = require('../helpers/ApiError');
const {companyDataservice,userRegDataservice } = require('../services/user_services');
const {addLeaveService, viewProfileService,leaveSummaryService,leaveHistoryService } = require('../services/employee_services');

class EmployeeController{
    static async companyData(req,res,next){
        try{
            const data = await companyDataservice(req.dbconnctionEmp);
            res.status(200).json(data);
        }
        catch(e){
            next(e);
        }
    }

    static async userRegData(req,res,next){
        try{
            const data = await userRegDataservice(req.dbconnctionEmp);
            res.status(200).json(data);
        }
        catch(e){
            next(e);
        }
    }
    
    static async addLeave(req,res,next){
        let body;
        try{
            body = await addLeaveValidation.validateAsync(req.body);
        } 
        catch(e){
            next(ApiError.unprocessableEntity(e.details[0]));
            return;
        }
        try{
            const data = await addLeaveService(body,req.dbconnctionEmp);
            res.status(200).json(data);
        }
        catch(e){
            next(e);
        }
    }
    static async empProfile(req,res,next){
        try{
            const emp = await viewProfileService(req.params.emp_id,req.dbconnctionEmp);
            res.status(200).json(emp);
        }
        catch(e){
            next(e);
        }
    }

    static async leaveSummary(req,res,next){
        try{
            const data = await leaveSummaryService(req.params.emp_id,req.dbconnctionEmp);
            res.status(200).json(data);
        }
        catch(e){
            next(e);
        }
    }

    static async leaveHistory(req,res,next){
        try{
            const data = await leaveHistoryService(req.emp_id,req.dbconnctionEmp);
            res.status(200).json(data);
        }
        catch(e){
            next(e);
        }
    }


}

module.exports = EmployeeController;