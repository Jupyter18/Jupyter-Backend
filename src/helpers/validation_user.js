const Joi = require('joi');

const loginValidation = Joi.object({
    emp_id : Joi.number().integer().min(9999).required(),
    password : Joi.string().required()
})

const changePassValidation = Joi.object().keys({
    emp_id: Joi.number().integer(),
    old_password: Joi.string().max(255).min(6).required(),
    new_password1: Joi.string().max(255).min(6).required(),
    new_password2: Joi.ref('new_password1'),
  });

module.exports = {
    loginValidation,
    changePassValidation
}