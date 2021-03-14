const Model = require('./Model');
const {executeSQL} = require('../database');

const dataTypes = new Map([
    ['int','INT'],
    ['short_string','VARCHAR(20)'],
    ['long_string','VARCHAR(200)'],
    ['img','BLOB'],
    ['date','DATE']
]);

class CustomAttribute extends Model{
    constructor(user){
        super(
            'custom_attribute',
            {
                emp_id : null,
            },
            user
        );
    }

    async addAttribute(field,type){
        try{
            await executeSQL(this.user,`ALTER TABLE ${this.tableName} ADD ?? ${dataTypes.get(type)}`,[field]);
            return {success: 'New field added successfully'}
        }
        catch(error){
            return {error}
        }
    }

    async removeAttribute(field){
        if(field == 'emp_id'){
            return {error : 'Can not delete primary key'}
        }
        try{
            await executeSQL(this.user,`ALTER TABLE ${this.tableName} DROP COLUMN ??`,[field]);
            return {success: 'Field removed successfully'}
        }
        catch(err){
            return {err}
        }
    }
}

module.exports = CustomAttribute;