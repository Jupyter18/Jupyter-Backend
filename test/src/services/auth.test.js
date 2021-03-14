const config = require('../../../src/config');
const assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

describe.skip("Auth",()=>{
    describe("Unit tesing",()=>{
        it("register",()=>{
            const register = require('../../../src/services/auth_services/register');
            return expect(Promise.resolve(
                register(10002)
            )).to.eventually.have.equal('Successfully added!');
        })
    })
})