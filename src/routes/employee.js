const router = require('express').Router();
const EmployeeController = require('../api/employee');

router.get('/companydata',EmployeeController.companyData);
router.get('/regdata',EmployeeController.userRegData);
router.post('/addleave',EmployeeController.addLeave);
router.get('/profile/:emp_id',EmployeeController.empProfile);
router.get('/leavesummary/:emp_id',EmployeeController.leaveSummary);
router.get('/leavehistory',EmployeeController.leaveHistory);
module.exports = router;