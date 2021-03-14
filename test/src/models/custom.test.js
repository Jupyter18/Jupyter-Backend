const config = require('../../../src/config');
const assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const user = {
    user : 'jadmin',
    password : 'admin123'
}
const CustomAttribute = require('../../../src/models/customAttribute');
const ca = new CustomAttribute(user);

describe('Custom attributes',()=>{
    describe('Adding/removing attribute',()=>{
        it('Adding new attribute',()=>{
            return expect(Promise.resolve(
                ca.addAttribute('count','int')
            )).to.eventually.have.property('success');
        });

        it('Remove custom attribute',()=>{
            return expect(Promise.resolve(
                ca.removeAttribute('count','int')
            )).to.eventually.have.property('success');
        })
    });

})