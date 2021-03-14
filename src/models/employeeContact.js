const Model = require('./Model');

class EmployeeContact extends Model{
    constructor(user){
        super(
            'employee_contact',
            {
                phone_number : null,
                emp_id : null
            },
            user
        );
    }
}

module.exports = EmployeeContact;