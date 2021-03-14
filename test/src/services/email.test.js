const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const should = chai.should();

chai.use(chaiAsPromised);

const sendMail = require('../../../src/services/email_service');

describe.skip('NodeMailer', function() {
    this.timeout(8000)
    it('Send message', () => {
        return expect(Promise.resolve(
            sendMail('ksrassignment@gmail.com','10000','password123')
        )).to.eventually.have.property('accepted');
    })
});