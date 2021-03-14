const config = require('../../../src/config');
const assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const {executeSQL} = require('../../../src/database');

const juser = {
    user : 'jadmin',
    password : 'admin123'
}

describe.skip('Database',()=>{
    describe('ExecuteSQL function for defualt user',()=>{
        it('Default user',()=>{
            return executeSQL({},'SELECT * FROM employee_data').should.eventually.be.a('Array');
        });
        it('Avoid SQL injection',()=>{
            return executeSQL({},'SELECT * FROM ?? WHERE ?? = ?',['employment_status','employment_status_id',1]).should.eventually.be.a('Array');
        });
        // it.skip('Insert using prepared statement',()=>{
        //     const tableName = 'department';
        //     const columns = ['department_id','department_name'];
        //     const values = [[3,'cse'],[4,'tronic']];
            
        //     executeSQL({},`INSERT INTO ?? ${columns.length === 0 ? "" : "(??)"} VALUES ${
        //         typeof values[0] === "object" ? "?" : "(?)"
        //       }`,
        //       [tableName, columns, values]).should.not.eventually.be.rejected;
        // })
    })

    describe('ExecuteSQL function- juser',()=>{
        it.skip('juser vaild access',()=>{
            return executeSQL(juser,'CALL GetAllEmp_branch(1)').should.eventually.be.an('Array');
        });
        it('juser invaild access',()=>{
            return executeSQL(juser,'SELECT * FROM employee_basic_settings').should.eventually.be.rejected;
        });
    });

    describe.skip('ExecuteFunctions',()=>{
        it('execution',()=>{
            const {executeFunction} = require('../../../src/database/index');
            return expect(Promise.resolve(
                executeFunction({user: 'jemp', password:'emp123'},'leave_insert',[10000,'2022-2-20',1])
            )).to.eventually.have.an('Object')
        })
    })
})