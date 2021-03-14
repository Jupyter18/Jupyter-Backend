const generator = require('generate-password');
const User = require('../../models/user');
const PresentEmployeeData = require('../../models/presentEmployeeData');
const ApiError = require('../../helpers/ApiError');
const {empDB,userDB} = require('../../helpers/dbConnections');
const {genHash} = require('../../helpers/bcrypt');
const sendMail = require('../email_service');

const registerService = async (emp_id)=>{
    const user = new User(userDB);
    const resUser = await user.findOne({pk:{emp_id}});
    if(resUser.success) throw ApiError.badRequest("User already signed");
    if(resUser.error != 'PK not found') throw ApiError.serverError("Somthing went wrong");

    const emp = new PresentEmployeeData(empDB);
    const resEmp = await emp.findOne({pk:{emp_id}});
    //console.log(emp.fields,resEmp)
    if(resEmp.error){
        if(resEmp.error == 'PK not found' ){
            throw ApiError.notfound("Can not find the employee record")
        }
        throw ApiError.serverError;
    }
    if(!emp.fields.supervisor_id && !emp.fields.is_supervisor){
        throw ApiError.badRequest("Before register, you need to have a supervisor");
    }

    const genPassword = generator.generate({
        length: 8,
        numbers : true
    })
    let password;
    try{
        password = await genHash(genPassword)
    }
    catch(e){
        throw ApiError.serverError("Unable to generate a password");
    }
    
    const newUserRes = await user.create({
        emp_id,
        password
    });

    if(newUserRes.error) throw ApiError.serverError("Unable register new user");
    try{
        await sendMail(emp.fields.email,emp_id,genPassword);
    }
    catch(err){
        throw ApiError.serverError('Unable to send an email')
    }
    return {success: `Password sent to ${emp.fields.email}`};
}

module.exports = registerService;