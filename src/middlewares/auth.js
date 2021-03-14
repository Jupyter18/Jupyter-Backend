const ApiError = require('../helpers/ApiError');
const {adminDB,superDB,hrmDB,empDB} = require('../helpers/dbConnections')
const {verify} = require('../helpers/jwt');

const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try{
            const {emp_id, is_admin, is_supervisor, is_hrm} = verify(token);
            req.emp_id = emp_id;
            req.dbconnectionAdmin = is_admin? adminDB : null;
            req.dbconnectionSuper = is_supervisor? superDB : null;
            req.dbconnectionHrm = is_hrm? hrmDB : null;
            req.dbconnctionEmp = emp_id? empDB : null;
            next();
        }catch(err){
            next(ApiError.redirect('/login'));
        } 
    }else{
        next();
    }
    
    
    
    
}


module.exports = auth;