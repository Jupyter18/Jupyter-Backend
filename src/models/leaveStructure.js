const Model = require('./Model');

class LeaveStructure extends Model{
    constructor(user){
        super(
            'leave_structure',
            {
                leave_type_id : null,
                leave_type : null
            },
            user
        );
    }
}

module.exports = LeaveStructure;