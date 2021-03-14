const Model = require('./Model');

class Department extends Model{
    constructor(user){
        super(
            'department',
            {
                department_id : null,
                department_name : null
            },
            user
        );
    }
}

module.exports = Department;