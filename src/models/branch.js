const Model = require('./Model');

class Branch extends Model{
    constructor(user){
        super(
            'branch',
            {
                branch_id : null,
                branch_name : null
            },
            user
        );
    }
}

module.exports = Branch;