const ApiError = require("../../helpers/ApiError");
const User = require('../../models/user');
const { compare, genHash} = require('../../helpers/bcrypt');

const changePassService = async (emp_id, body, user) => {
    if(!user) throw ApiError.unauthorized();
    const usr = new User(user);
    if(body.emp_id != emp_id) throw ApiError.unauthorized();

    const res = await usr.findOne({
        pk:{emp_id: body.emp_id}
    });
    if(res.error) throw ApiError.badRequest('Can not find the employee record');

    const match = await compare(body.old_password,usr.fields.password);
    if(!match) throw ApiError.badRequest('Incorrect passwrod');
    
    let newPassword;
    try{
        newPassword = await genHash(body.new_password1);
    }
    catch(e){
        throw ApiError.serverError("Unable to generate a password");
    }
    usr.fields.password = newPassword;
    const resSave = await usr.save();

    if(resSave.error) throw ApiError.serverError('Unable to update the password');
    return;
}

module.exports = changePassService;