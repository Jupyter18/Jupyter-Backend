const Model = require('./Model');

class LeaveSummary extends Model{
    constructor(user){
        super(
            'leave_summary',
            {
                emp_id : null,
                leave_type_id : null,
                leave_count : null
            },
            user
        );
    }
}

module.exports = LeaveSummary;