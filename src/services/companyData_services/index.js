const ApiError = require('../../helpers/ApiError');
const Branch = require('../../models/branch');
const Department = require('../../models/department');
const EmploymentStatus = require('../../models/employmentStatus');
const JobTitle = require('../../models/jobTitle');
const PayGrade = require('../../models/payGrade');

const branchDataservice = async (user)=>{
    const branchData = new Branch(user);
    const res = await branchData.findAll(true);
    const branch = JSON.parse(JSON.stringify(res));

    if(res.error) throw ApiError.unprocessableEntity(res.error);
    return branch;
}

const departmentDataservice = async (user)=>{
    const departmentData = new Department(user);
    const res = await departmentData.findAll(true);
    const department = JSON.parse(JSON.stringify(res));

    if(res.error) throw ApiError.unprocessableEntity(res.error);
    return department;
}

const empstatusDataservice = async (user)=>{
    const empstateData = new EmploymentStatus(user);
    const res = await empstateData.findAll(true);
    const employment_status = JSON.parse(JSON.stringify(res));
    
    if(res.error) throw ApiError.unprocessableEntity(res.error);
    return employment_status;
}
const jobtitleDataservice = async (user)=>{
    const jobtitleData = new JobTitle(user);
    const res = await jobtitleData.findAll(true);
    const job_title = JSON.parse(JSON.stringify(res));

    if(res.error) throw ApiError.unprocessableEntity(res.error);
    return job_title;
}
const paygradeDataservice = async (user)=>{
    const paygradeData = new PayGrade(user);
    const res = await paygradeData.findAll(true);
    const pay_grade = JSON.parse(JSON.stringify(res));

    if(res.error) throw ApiError.unprocessableEntity(res.error);
    return pay_grade;
}

function dataMap(data){
    const val = new Object();
    data.forEach(element => {
        var [prop1,prop2] = Object.keys(element);
        var[id,name] = [element[prop1], element[prop2]];
        val[id] = name;
    });
    return val;
}

module.exports = {
    departmentDataservice,
    branchDataservice,
    empstatusDataservice , 
    jobtitleDataservice,
    paygradeDataservice
}