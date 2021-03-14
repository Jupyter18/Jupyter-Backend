const Model = require('./Model');

class PayGrade extends Model{
    constructor(user){
        super(
            'pay_grade',
            {
                pay_grade_id : null,
                pay_level : null
            },
            user
        );
    }
}

module.exports = PayGrade;