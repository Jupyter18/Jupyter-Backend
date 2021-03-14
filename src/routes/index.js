const userRoutes = require('./user');
const exampleRoutes = require('./example');
const adminRoutes = require('./admin');
const hrmRoutes = require('./hrm');
const supervisorRoutes = require('./supervisor');
const employeeRoutes = require('./employee');

const endPointsHandler = (app)=>{
    app.use('/api/user',userRoutes);
    app.use('/api/example',exampleRoutes);
    app.use('/api/admin',adminRoutes);
    app.use('/api/hrm',hrmRoutes);
    app.use('/api/supervisor',supervisorRoutes)
    app.use('/api/employee',employeeRoutes);
}

module.exports = {endPointsHandler};