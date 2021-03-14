const router = require('express').Router();
const HrmController = require('../api/hrm');

//Routes Here

router.post('/user',HrmController.userRegistration);
router.get('/empList/:branch_id',HrmController.empList);
router.get('/user/:emp_id',HrmController.emp);
router.put('/user/:emp_id',HrmController.changeEmp);
router.delete('/user/:emp_id',HrmController.removeEmp);

router.post('/addAttribute',HrmController.addAttribute);
router.delete('/removeAttribute/:attribute',HrmController.removeAttribute);

router.get('/getCstAttribute',HrmController.getCstAttribute);
router.post('/customData/:emp_id', HrmController.customData);

// Report component routes

router.get('/report/DeptLeaves/:dept_id,:sdt,:edt',HrmController.DeptLeaves); // params dept_name


router.get('/report/EmpListDept/:dept_id',HrmController.EmpListDept); // params dept_name

router.get('/report/EmpListTitle/:job_title',HrmController.EmpListTitle);

router.get('/report/EmpListGrade/:pay_grade',HrmController.EmpListGrade);


router.get('/report/EmpListNation/:nation',HrmController.EmpListNation);

router.get('/report/EmpListQualification/:qualification',HrmController.EmpListQualification);

router.get('/report/EmpListReligion/:religion',HrmController.EmpListReligion);


router.get('/report/ServiceTime/:Date',HrmController.ServiceTime);





module.exports = router;