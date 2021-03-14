const Model = require('./Model');

class BasicSettings extends Model{
    constructor(user){
        super(
            'basic_settings',
            {
                reg_num : null,
                name : null,
                address : null
            },
            user
        );
    }
}

module.exports = BasicSettings;