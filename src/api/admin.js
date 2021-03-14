/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
const {userRegValidation, userUpdateValidation, addAttributeValidation, contactsValidation} =require('../helpers/validation_admin');
const ApiError = require('../helpers/ApiError');
const {userRegService,
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
  searchEmpService
} = require('../services/admin_services');

class AdminController {
  static async userRegistration(req, res, next) {
    const body = req.body;
    let valiBody;
    try {
      valiBody = await userRegValidation.validateAsync(body);
    } catch (e) {
      next(ApiError.unprocessableEntity(e.details[0]));
      return;
    }

    try {
      const data = await userRegService(valiBody, req.dbconnectionAdmin);
      res.status(201).json(data);
      return;
    } catch (e) {
      next(e);
      return;
    }
  }

  static async empList(req, res, next) {
    try {
      const data = await empListService(req.params.branch_id, req.dbconnectionAdmin);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  static async emp(req, res, next) {
    try {
      const emp = await empService(req.params.emp_id, req.dbconnectionAdmin);
      res.status(200).json(emp);
    } catch (e) {
      next(e);
    }
  }

  static async changeEmp(req, res, next) {
    let body;
    try {
      body = await userUpdateValidation.validateAsync(req.body);
    } catch (e) {
      next(ApiError.unprocessableEntity(e.details[0]));
      return;
    }
    try {
      await changeEmpService(req.params.emp_id, body, req.dbconnectionAdmin);
      res.status(200).json({success: 'Updated successfully'});
    } catch (e) {
      next(e);
    }
  }

  static async removeEmp(req, res, next) {
    try {
      await removeEmpService(req.params.emp_id, req.dbconnectionAdmin);
      res.status(200).json({success: 'Deleted successfully'});
    } catch (e) {
      next(e);
    }
  }

  static async addAttribute(req, res, next) {
    let body;
    try {
      body = await addAttributeValidation.validateAsync(req.body);
    } catch (e) {
      next(ApiError.unprocessableEntity(e.details[0]));
      return;
    }
    try {
      await addAttributeService(body, req.dbconnectionAdmin);
      res.status(201).json({success: 'Succussfully created'});
    } catch (e) {
      next(e);
    }
  }

  static async removeAttribute(req, res, next) {
    try {
      await removeAttributeService(req.params.attribute, req.dbconnectionAdmin);
      res.status(200).json({success: 'Succussfully removed'});
    } catch (e) {
      next(e);
    }
  }

  static async addContacts(req, res, next) {
    let body;
    try {
      body = await contactsValidation.validateAsync(req.body);
    } catch (e) {
      next(ApiError.unprocessableEntity(e.details[0]));
      return;
    }

    try {
      const data = await addContactsService(body, req.dbconnectionAdmin);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  }

  static async getContacts(req, res, next) {
    try {
      const data = await getContactsService(req.params.emp_id, req.dbconnectionAdmin);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  static async getEmpAttribute(req, res, next) {
    try {
      const data = await getEmpAttributeService(req.dbconnectionAdmin);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  // eslint-disable-next-line require-jsdoc
  static async getCstAttribute(req, res, next) {
    try {
      const data = await getCstAttributeService(req.dbconnectionAdmin);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  static async searchEmp(req,res,next){
    try{
      const data = await searchEmpService(req.params.regex, req.dbconnectionAdmin);
      res.status(200).json(data);
    }
    catch(e){
      next(e);
    }
  }
}

module.exports = AdminController;
