/* eslint-disable camelcase */
/* eslint-disable max-len */
const {executeProcedure} = require('../../database');
const ApiError = require('../../helpers/ApiError');
const leaveApplication = require('../../models/leaveApplication');
const Op = require('../../helpers/op');

const viewLeaveService = async (superId, user) => {
  if (!user) throw ApiError.unauthorized();
  try {
    const data = await executeProcedure(user, 'GetLeaveDetails', superId);
    return data;
  } catch (e) {
    throw ApiError.serverError('Error occured in GetLeaveDetails procedure');
  }
};

const approveLeaveService = async (body, user) => {
  if (!user) throw ApiError.unauthorized();

  // eslint-disable-next-line new-cap
  const leaveApp = new leaveApplication(user);

  const emp_id = body.emp_id;
  const leave_date = body.leave_date;


  const res = await leaveApp.findOne({pk: Op.and({emp_id}, {leave_date})});
  if (res.error) throw ApiError.unprocessableEntity(res.error);

  leaveApp.fields['is_approved'] = 1;

  const save = await leaveApp.save();
  if (save.error) throw ApiError.unprocessableEntity('Unable to approve leave');
  return {succuss:'Approved'};
};

const rejectLeaveService = async (body, user) => {
  if (!user) throw ApiError.unauthorized();

  // eslint-disable-next-line new-cap
  const leaveApp = new leaveApplication(user);

  const emp_id = body.emp_id;
  const leave_date = body.leave_date;


  const res = await leaveApp.findOne({pk: Op.and({emp_id}, {leave_date})});
  if (res.error) throw ApiError.unprocessableEntity(res.error);

  leaveApp.fields['is_approved'] = 0;

  const save = await leaveApp.save();
  if (save.error) throw ApiError.unprocessableEntity('Unable to reject leave');
  return {succuss:'Secessfully Rejected'};
};

module.exports = {
  viewLeaveService,
  approveLeaveService,
  rejectLeaveService

};
