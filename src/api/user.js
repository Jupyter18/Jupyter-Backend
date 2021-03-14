const { loginValidation, changePassValidation } = require('../helpers/validation_user');
const ApiError = require('../helpers/ApiError');
const loginService = require('../services/auth_services/login');
const registerService = require('../services/auth_services/register');
const changePassService = require('../services/auth_services/changePass');

class UserController{
    static async login(req,res,next){
        let body;
        try{
            body = await loginValidation.validateAsync(req.body);
        }
        catch(e){
            next(ApiError.unprocessableEntity(e.details[0]));
            return;
        }
        try{
            const data = await loginService(body.emp_id,body.password);
            res.status(200).json(data);
        }
        catch(e){
            next(e);
        }
    }

    static async register(req,res,next){
        try{
            const data = await registerService(req.params.emp_id);
            res.status(201).json(data);
        }
        catch(e){
            next(e);
        }
  }

    static async changePass(req, res, next){
        let vaildBody;
        try{
            vaildBody = await changePassValidation.validateAsync(req.body);
        }
        catch(e){
            next(ApiError.unprocessableEntity(e.details[0]));
            return;
        }
        try{
            await changePassService(req.emp_id, vaildBody, {});
            res.status(201).json({succus: "Changed the password"});
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = UserController;