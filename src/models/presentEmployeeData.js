const Model = require('./Model');

class PresentEmployeeData extends Model{
    constructor(user){
        super(
            'present_employee_data',
            {
                emp_id : null,
                first_name : null,
                last_name : null,
                birth_date : null,
                marital_status : null,
                email : null,
                gender : null,
                job_title_id : null,
                pay_grade_id : null,
                employment_status_id : null,
                department_id : null,
                branch_id : null,
                is_supervisor : null,
                supervisor_id : null,
            },
            user
        );
    }
}

module.exports = PresentEmployeeData;