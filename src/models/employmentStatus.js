const Model = require('./Model');

class EmploymentStatus extends Model{
    constructor(user){
        super(
            'employment_status',
            {
                employment_status_id : null,
                category : null
            },
            user
        );
    }
}

module.exports = EmploymentStatus;