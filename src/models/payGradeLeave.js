const Model = require('./Model');

class PayGradeLeave extends Model{
    constructor(user){
        super(
            'paygrade_leave',
            {
                leave_type_id : null,
                pay_grade_id : null,
                leave_amount : null
            },
            user
        );
    }
}

module.exports = PayGradeLeave;