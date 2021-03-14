/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const {viewLeaveService} = require('../services/sup_service');
const {approveLeaveService} = require('../services/sup_service');
const {rejectLeaveService} = require('../services/sup_service');



class SupervisorController {
  static async viewLeave(req, res, next) {
    try {
      const data = await viewLeaveService(req.params.superId, req.dbconnectionSuper);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  static async approveLeave(req, res, next) {
    try {
      const data = await approveLeaveService(req.body, req.dbconnectionSuper);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  static async rejectLeave(req, res, next) {
    try {
      const data = await rejectLeaveService(req.body, req.dbconnectionSuper);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = SupervisorController;

