const Joi = require('joi');

const addLeaveValidation = Joi.object({
        emp_id : Joi.number().integer().required(),
        leave_date : Joi.date().greater('now').required(),
        leave_type_id : Joi.number().integer().required(),
    }
);


module.exports = {
    addLeaveValidation  
}