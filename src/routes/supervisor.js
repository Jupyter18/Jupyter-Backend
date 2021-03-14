const router = require('express').Router();
const SupervisorController = require('../api/supervisor');

// Routes Here
router.get('/viewLeaveDetails/:superId', SupervisorController.viewLeave);
router.put('/approveLeave', SupervisorController.approveLeave);
router.put('/rejectLeave', SupervisorController.rejectLeave);


module.exports = router;
