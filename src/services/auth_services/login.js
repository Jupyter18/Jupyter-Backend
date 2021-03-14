const ApiError = require('../../helpers/ApiError');
const User = require('../../models/user');
const PresentEmployeeData = require('../../models/presentEmployeeData');
const {sign} = require('../../helpers/jwt');
const {userDB,empDB} = require('../../helpers/dbConnections');
const {compare} =require('../../helpers/bcrypt');

const loginService = async (emp_id,password)=>{
    const user = new User(userDB);
    const res1 = await user.findOne({
        pk:{emp_id}
    });
    if(res1.error) throw ApiError.notfound('User record not found');

    const match = await compare(password,user.fields.password);
    if(!match) throw ApiError.badRequest('Incorrect passwrod');

    const emp = new PresentEmployeeData(empDB);
    const res2 = await emp.findOne({
        pk:{emp_id}
    });

    if(res2.error) throw ApiError.serverError('Can not find the employee record');

    const token = sign({
        emp_id: emp_id,
        branch_id: emp.fields.branch_id,
        is_admin: user.fields.is_admin,
        is_supervisor: emp.fields.is_supervisor,
        is_hrm : (emp.fields.job_title_id == 1)? 1 : 0,
    });
    return {
        token,
        emp_id,
        branch_id: emp.fields.branch_id,
        is_supervisor: emp.fields.is_supervisor,
        is_admin: user.fields.is_admin,
        is_hrm: (emp.fields.job_title_id == 1)? 1 : 0
    };
}

module.exports = loginService;