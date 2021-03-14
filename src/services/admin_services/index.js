/* eslint-disable max-len */
const {executeProcedure} = require('../../database');
const ApiError = require('../../helpers/ApiError');
const logger = require('../../helpers/logger');
const CustomAttribute = require('../../models/customAttribute');
const EmployeeData = require('../../models/employeeData');
const PersentEmployeeData = require('../../models/presentEmployeeData');
const EmployeeContact = require('../../models/employeeContact');

const dataTypes = new Map([
  ['INT', 'int'],
  ['VARCHAR(20)', 'short_string'],
  ['VARCHAR(200)', 'long_string'],
  ['BLOB', 'img'],
  ['DATE', 'date'],
]);

const userRegService = async (body, user)=>{
  if (!user) throw ApiError.unauthorized();
  try {
    const data = await executeProcedure(user, 'add_employee', Object.values(body));
    return data;
  } catch (e) {
    throw ApiError.serverError('Error occured in add_employee procedure');
  }
};

const empListService = async (branch_id, user)=>{
  const empData = new EmployeeData(user);
  if (!user) throw ApiError.unauthorized();
  const data = await empData.findAll({
    where: {branch_id: branch_id},
  });
  if (data.error) throw ApiError.serverError('Unable to return employee data');
  return data;
};

const empService = async (emp_id, user)=>{
  if (!user) throw ApiError.unauthorized();
  const empData = new EmployeeData(user);
  const res = await empData.findOne({pk: {emp_id}});

  if (res.error) throw ApiError.unprocessableEntity(res.error);

  return empData.fields;
};

const changeEmpService = async (emp_id, body, user)=>{
  if (!user) throw ApiError.unauthorized();
  const empData = new EmployeeData(user);
  const res = await empData.findOne({pk: {emp_id}});
  if (res.error) throw ApiError.unprocessableEntity(res.error);

  for (const [key, value] of Object.entries(body)) {
    empData.fields[key] = value;
  }
  const save = await empData.save();
  if (save.error) throw ApiError.unprocessableEntity('Unable to update');
  return;
};

const removeEmpService = async (emp_id, user)=>{
  const empData = new EmployeeData(user);
  const res = await empData.findOne({pk: {emp_id}});
  if (res.error) throw ApiError.unprocessableEntity(res.error);

  empData.fields['is_deleted'] = 1;

  const save = await empData.save();
  if (save.error) throw ApiError.unprocessableEntity('Unable to remove employee');
  return;
};

const addAttributeService = async (body, user)=>{
  if (!user) throw ApiError.unauthorized();
  const cusAttribute = new CustomAttribute(user);
  const res = await cusAttribute.addAttribute(body.COLUMN_NAME, body.COLUMN_TYPE);

  if (res.error) throw ApiError.conflicted('Field already exists');
};

const removeAttributeService = async (field, user)=>{
  if (!user) throw ApiError.unauthorized();
  const cusAttribute = new CustomAttribute(user);
  const res = await cusAttribute.removeAttribute(field);

  if (res.error) throw ApiError.unauthorized(res.error);
  if (res.err) throw ApiError.serverError;
};

const addContactsService = async (body, user)=>{
  if (!user) throw ApiError.unauthorized();
  const contacts = new EmployeeContact(user);
  const res = await contacts.create(body);
  if (res.error) {
    if (res.error.error.errno == 1062) {
      throw ApiError.serverError('Phone number already exists');
    }
    throw ApiError.serverError('Unable to update');
  }
  return res.success;
};

const getContactsService = async (emp_id, user)=>{
  if (!user) throw ApiError.unauthorized();
  const contacts = new EmployeeContact(user);
  const res = await contacts.findAll({
    where: {emp_id: emp_id},
  });
  if (res.error) throw ApiError.serverError('Unable to get phone numbers');
  return res;
};

const getEmpAttributeService = async (user)=>{
  if (!user) throw ApiError.unauthorized();
  const emp = new EmployeeData(user);
  const res = await emp.describe();

  if (res.error) throw ApiError.serverError('Unable to return employee data attributes');
  return res;
};
const getCstAttributeService = async (user)=>{
  if (!user) throw ApiError.unauthorized();
  const cusAttribute = new CustomAttribute(user);
  const res = await cusAttribute.describe();
  const atr = JSON.parse(JSON.stringify(res));

  atr.forEach((element) => {
    element.COLUMN_TYPE = dataTypes.get(element.COLUMN_TYPE.toUpperCase());
  });

  if (res.error) throw ApiError.serverError('Unable to return Custom attributes');
  return atr;
};

const searchEmpService = async (regex,user) => {
  if (!user) throw ApiError.unauthorized();
  const emp = new PersentEmployeeData(user);
  const data = await emp.findAll({
    attributes: ['emp_id', 'first_name'],
    like: {first_name: `${regex}%`}
  });
  console.log(data);
  if(data.error) throw ApiError.serverError('Somthing went wrong when searching');
  return data;
}

module.exports = {
  userRegService,
  empListService,
  empService,
  changeEmpService,
  removeEmpService,
  addAttributeService,
  removeAttributeService,
  addContactsService,
  getContactsService,
  getEmpAttributeService,
  getCstAttributeService,
  searchEmpService,
};
