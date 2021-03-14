const Model = require('./Model');

class Session extends Model{
    constructor(user){
        super(
            'session',
            {
                session_id : null,
                emp_id : null,
                expire_date : null,
                job_title : null
            },
            user
        );
    }
}

module.exports = Session;