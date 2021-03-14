const {userRegValidation, userUpdateValidation} =require('../helpers/validation_hrm');
const ApiError = require('../helpers/ApiError');
const {userRegService,
    empListService,
    empService,
    changeEmpService,
    removeEmpService,
    addAttributeService,
    removeAttributeService,
    addContactsService,
    getContactsService,
    getCstAttributeService,
    } = require('../services/admin_services');

const {DeptLeaves,EmpFetchDept,
    EmpFetchTitle,
    EmpFetchGrade,
    EmpFetchNation,
    EmpFetchQualification,
    EmpFetchReligion,
    EmpFetchServed} = require('../services/report_services');

const {customDataService} = require('../services/hrm_services');

class HrmController{
    static async userRegistration(req,res,next){
        const body = req.body;
        let vali_body;
        try{
            vali_body = await userRegValidation.validateAsync(body);
        }
        catch(e){
            next(ApiError.unprocessableEntity(e));
            return;
        }

        try{
            const data = await userRegService(vali_body,req.dbconnectionHrm);
            res.status(201).json(data);
            return;
        }
        catch(e){
            next(ApiError.serverError);
            return;
        }
    }
    static async empList(req,res,next){
        try{
            const data = await empListService(req.params.branch_id,req.dbconnectionHrm);
            res.status(200).json(data);
        }
        catch(e){
            next(e);
        }
    }
    static async emp(req,res,next){
        try{
            const emp = await empService(req.params.emp_id,req.dbconnectionHrm);
            res.status(200).json(emp);
        }
        catch(e){
            next(e);
        }
    }

    static async changeEmp(req,res,next){
        let body;
        try{
            body = await userUpdateValidation.validateAsync(req.body);
        } 
        catch(e){
            next(ApiError.unprocessableEntity(e.details[0]));
            return;
        }
        try{
            await changeEmpService(req.params.emp_id,body,req.dbconnectionHrm);
            res.status(200).json({success:'Updated successfully'});
        }
        catch(e){
            next(e);
        }
    }

    static async removeEmp(req,res,next){
        try{
            await removeEmpService(req.params.emp_id,req.dbconnectionHrm);
            res.status(200).json({success:'Deleted successfully'});
        }
        catch(e){
            next(e);
        }
    }

    static async addAttribute(req,res,next){
        let body;
        try{
            body = await addAttributeValidation.validateAsync(req.body);
        }
        catch(e){
            next(ApiError.unprocessableEntity(e.details[0]));
            return;
        }
        try{
            await addAttributeService(body,req.dbconnectionHrm);
            res.status(201).json({success:'Succussfully created'});
        }
        catch(e){
            next(e);
        }
    }

    static async removeAttribute(req,res,next){
        try{
            await removeAttributeService(req.params.attribute,req.dbconnectionHrm);
            res.status(200).json({success:'Succussfully removed'});
        }
        catch(e){
            next(e);
        }
    }


    // Report Module controlling 
    
    static async DeptLeaves(req,res,next){
        try{
            const dept = req.params.dept_id;
            const sdt = req.params.sdt;
            const edt = req.params.edt;

            const result  = await DeptLeaves([dept,sdt,edt],req.dbconnectionHrm);

            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    static async EmpListDept(req,res,next){
        try{
            const data = req.params.dept_id;

            const result = await EmpFetchDept(data,req.dbconnectionHrm);

            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    static async EmpListTitle(req,res,next){
        try{
            const data = req.params.job_title;

            const result =  await EmpFetchTitle(data,req.dbconnectionHrm);

            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    static async EmpListGrade(req,res,next){
        try{
            const data = req.params.pay_grade;

            const result = await EmpFetchGrade(data,req.dbconnectionHrm);

            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    static async EmpListNation(req,res,next){
        try{
            const data = req.params.nation;

            const result = await EmpFetchNation(data,req.dbconnectionHrm);

            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    static async EmpListQualification(req,res,next){
        try{
            const data = req.params.qualification;

            const result = await EmpFetchQualification(data,req.dbconnectionHrm);

            res.status(200).json(result);
        }
        catch(e){
            next(e);
        }
    }

    static async EmpListReligion(req,res,next){
        try{
            const data = req.params.religion;

            const result = await EmpFetchReligion(data,req.dbconnectionHrm);

            res.status(200).json(result);

        }
        catch(e){
            next(e);
        }
    }

    static async ServiceTime(req,res,next){
        try{
            const data = req.params.Date;

            const result = await EmpFetchServed(data,req.dbconnectionHrm);

            res.status(200).json(result);
        }
        catch(e){
            next(e); 
        }
    }

    static async customData(req, res, next) {
        try{
            await customDataService(req.dbconnectionHrm, req.params.emp_id, req.body);
            res.status(201).json({success: 'Succuessfully added'})
        }
        catch(e){
            next(e);
        }
    }
    
    static async getCstAttribute(req, res, next) {
        try {
          const data = await getCstAttributeService(req.dbconnectionHrm);
          res.status(200).json(data);
        } catch (e) {
          next(e);
        }
      }
}


module.exports = HrmController;