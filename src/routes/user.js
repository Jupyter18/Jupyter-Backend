const router = require('express').Router();
const UserController = require('../api/user');

router.post('/login',UserController.login);
router.post('/register/:emp_id',UserController.register);
router.post('/changePass', UserController.changePass);
module.exports = router;