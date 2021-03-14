const router = require('express').Router();
const AdminController = require('../api/admin');

router.post('/user',AdminController.userRegistration);
router.get('/empList/:branch_id',AdminController.empList);
router.get('/user/:emp_id',AdminController.emp);
router.put('/user/:emp_id',AdminController.changeEmp);
router.delete('/user/:emp_id',AdminController.removeEmp);

router.post('/addAttribute',AdminController.addAttribute);
router.delete('/removeAttribute/:attribute',AdminController.removeAttribute);
router.get('/getEmpAttribute',AdminController.getEmpAttribute);
router.get('/getCstAttribute',AdminController.getCstAttribute);

router.post('/empContacts',AdminController.addContacts);
router.get('/empContacts/:emp_id',AdminController.getContacts);

router.get('/searchEmp/:regex', AdminController.searchEmp);

module.exports = router;