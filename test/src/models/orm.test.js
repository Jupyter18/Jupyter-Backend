const config = require('../../../src/config');
const assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const create = require('../../../src/models/orm/create');
const Department = require('../../../src/models/department');
const Op = require('../../../src/helpers/op');

describe('ORM testing',()=>{
    describe('create',()=>{
        const table = {f1:null,f2:null,f3:null}
        it('Creatig arrays using obj',()=>{
            const obj = {f1:'name',f2:'age',f3:2}
            expect(create(obj,table)).to.have.property('cols');
            expect(create(obj,table)).to.have.property('values');
        });
        it('Creatig arrays using obj Array ',()=>{
            const obj = [{f1:'name',f2:'age',f3:2},{f1:'name',f2:'age',f3:2}];
            const {cols,values} = create(obj,table);
            expect(values[0]).to.be.a('Array');
        });

        it.skip('Creatig arrays when missmatch fields ',()=>{
            const obj = [{f1:'name',f2:'age',f3:2},{f1:'name',f2:'age',f5:2}];
            expect(create(obj,table)).to.be.null;
        });
    });

    describe('Model-department',()=>{
        const dpt = new Department({user:'jemp',password:'emp123'});
        it.skip('Department.create',()=>{
            return expect(Promise.resolve(dpt.create(
                [
                    {
                        department_id : 3,
                        department_name : 'cse'
                    },
                    {
                        department_id : 4,
                        department_name : 'tronic'
                    }
                ]
            ))).to.eventually.have.property('success');
        })

        it('Department-select',()=>{
            
            return expect(Promise.resolve(dpt.findAll(
                {where: {department_id:1}}
            ))).to.eventually.have.an('Array');
        });
        it('Department-select With Op-> AND, OR, limit',()=>{
            return expect(Promise.resolve(dpt.findAll(
                {
                    where: Op.or({department_id:3},Op.and({department_id:4},{department_name:'tronic'})),
                    limit : 1
                }
            ))).to.eventually.have.an('Array');
        });

        it('Department-select With Op-> orderBy',()=>{
            return expect(Promise.resolve(dpt.findAll(
                {
                    orderBy : ['department_name','department_id']
                }
            ))).to.eventually.have.an('Array');
        });

        it('Department-select With Op-> orderByDESC',()=>{
            return expect(Promise.resolve(dpt.findAll(
                {
                    orderByDESC : ['department_name']
                }
            ))).to.eventually.have.an('Array');
        });

        it('Department-select With Op simple AND , select attibutes',()=>{
            return expect(Promise.resolve(dpt.findAll(
                {
                    where: Op.and({department_id:3},{department_name:'cse'}),
                    attributes : ['department_id'],
                    like : {department_name:'HR%'}
                }
            ))).to.eventually.have.an('Array');
        });
        it('Department-describe',()=>{
            return expect(Promise.resolve(dpt.describe()
            )).to.eventually.have.an('Array');
        });
    });

    describe('findOne',()=>{
        it('Update the model',()=>{
            const dpt = new Department({});
            dpt.findOne({pk:1}).then(e=>{
                //console.log(dpt.fields)
            })
            // return expect(
            //     Promise.resolve(dpt.findOne({pk:1}))
            //     ).to.eventually.not.rejectedWith(Error)
        })
    })
})