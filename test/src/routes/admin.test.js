const assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();
const request = require('supertest');
const startServer = require('../../../src/app');

let app;
let token;
(async ()=>{
    app =await startServer();
})();

describe('Admin routes',()=>{
    
    before((done)=>{
        request(app)
            .post('/api/user/login')
            .send({emp_id:10000, password: 'cAoXPm7r'})
            .end((err, res) => {
                token = res.body.token;
                done();
            })
        
    });
    describe('/api/user/login', () => {

    });
    describe('Update employee',()=>{
        it("/api/admin/user/10000",(done)=>{
            request(app)
                .put('/api/admin/user/10000')
                .set('Authorization', 'Bearer ' + token)
                .send({"first_name" : "Isuru"})
                .set('Accept','application/json')
                .expect('Content-Type',/json/)
                .expect(200,done);
        })
    });
    describe('GET:' , ()=>{
        it('/api/admin/empList/1',(done)=>{
            request(app)
                .get('/api/admin/empList/1')
                .set('Authorization', 'Bearer ' + token)
                .expect('Content-Type',/json/)
                .expect(res=>res.body.should.have.an("Array"))
                .expect(200,done);
        });
        it('/api/admin/user/10000',(done)=>{
            request(app)
                .get('/api/admin/user/10000')
                .set('Accept','application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect('Content-Type',/json/)
                .expect(res=>res.body.should.have.an("Object"))
                .expect(200,done);
        });
        it('/api/admin/empContacts/10000',(done)=>{
            request(app)
                .get('/api/admin/empContacts/10000')
                .set('Authorization', 'Bearer ' + token)
                .set('Accept','application/json')
                .expect('Content-Type',/json/)
                .expect(res=>res.body.should.have.an("Array"))
                .expect(200,done);
        });
    });

    describe('POST',()=>{
        it('/api/admin/addAttribute',(done)=>{
            request(app)
                .post('/api/admin/addAttribute')
                .set('Authorization', 'Bearer ' + token)
                .send({COLUMN_NAME:'CusTest',COLUMN_TYPE:'int'})
                .set('Accept','application/json')
                .expect('Content-Type',/json/)
                .expect(201,done);
        })
    });
    describe('DELETE',()=>{
        it('/api/admin/removeAttribute/cusTest',(done)=>{
            request(app)
                .delete('/api/admin/removeAttribute/cusTest')
                .set('Authorization', 'Bearer ' + token)
                .set('Accept','application/json')
                .expect('Content-Type',/json/)
                .expect(200,done);
        })

    })
})