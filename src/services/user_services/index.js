const ApiError = require('../../helpers/ApiError');
const { departmentDataservice,branchDataservice,empstatusDataservice , jobtitleDataservice,paygradeDataservice} = require('../companyData_services');


const companyDataservice = async (user)=>{
    const depData = await departmentDataservice(user);
    const department = dataMap(depData);

    const branchData = await branchDataservice(user);
    const branch = dataMap(branchData);

    const empStatData = await empstatusDataservice(user);
    const employment_status = dataMap(empStatData);

    const jobData = await jobtitleDataservice(user);
    const job_title = dataMap(jobData);

    const payData = await paygradeDataservice(user);
    const pay_grade = dataMap(payData);

    const allData = {department,branch,employment_status,job_title,pay_grade}

    return allData;
}

const userRegDataservice = async (user)=>{
    const department = await departmentDataservice(user);
  
    const branch = await branchDataservice(user);

    const employment_status = await empstatusDataservice(user);

    const job_title = await jobtitleDataservice(user);

    const pay_grade = await paygradeDataservice(user);

    const allData = {department,branch,employment_status,job_title,pay_grade}

    return allData;
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
    companyDataservice,
    userRegDataservice,   
}