const Model = require('./Model');

class JobTitle extends Model{
    constructor(user){
        super(
            'job_title',
            {
                job_title_id : null,
                job_name : null
            },
            user
        );
    }
}

module.exports = JobTitle;