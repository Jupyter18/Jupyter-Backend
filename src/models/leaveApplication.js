const Model = require('./Model');

class LeaveApplication extends Model{
    constructor(user){
        super(
            'leave_application',
            {
                emp_id : null,
                leave_date : null,
                leave_type_id : null,
                is_approved : null
            },
            user
        );
    }
}

module.exports = LeaveApplication;