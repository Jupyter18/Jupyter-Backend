const Model = require('./Model');

class User extends Model{
    constructor(user){
        super(
            'user_account',
            {
                emp_id : null,
                password : null,
                is_admin : null
            },
            user
        );
    }
}

module.exports = User;