const Joi = require('joi');

const userRegValidation = Joi.object({
        first_name : Joi.string().min(3).required(),
        last_name : Joi.string().min(3).allow('',null).required(),
        birth_date : Joi.date().allow('',null).required(),
        marital_status : Joi.string().valid('M','S').allow('',null).required(),
        email : Joi.string().email().required(),
        gender : Joi.string().valid('M','F').required(),
        job_title_id : Joi.number().integer().required(),
        pay_grade_id : Joi.number().integer().required(),
        employment_status_id : Joi.number().integer().required(),
        department_id : Joi.number().integer().required(),
        branch_id : Joi.number().integer().allow('',null).required(),
        is_supervisor : Joi.number().integer().valid(0,1).allow('',null).required(),
        supervisor_id : Joi.number().integer().allow('',null).required(),
        contact_no : Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    }
);

const userUpdateValidation = Joi.object({
    first_name : Joi.string().min(3),
    last_name : Joi.string().min(3).allow('',null),
    birth_date : Joi.date().allow('',null),
    marital_status : Joi.string().valid('M','S').allow('',null),
    email : Joi.string().email(),
    gender : Joi.string().valid('M','F'),
    job_title_id : Joi.number().integer(),
    pay_grade_id : Joi.number().integer(),
    employment_status_id : Joi.number().integer(),
    department_id : Joi.number().integer(),
    branch_id : Joi.number().integer().allow('',null),
    is_supervisor : Joi.number().integer().valid(0,1).allow('',null).required(),
    supervisor_id : Joi.number().integer().allow('',null),
    contact_no : Joi.string().length(10).pattern(/^[0-9]+$/),
    is_deleted : Joi.number().integer().valid(0,1),
});

const addAttributeValidation = Joi.object({
    field : Joi.string().max(20).required(),
    type : Joi.string().valid('int','short_string','long_string','img').required()
})

module.exports = {
    userRegValidation,
    userUpdateValidation,
    addAttributeValidation

}