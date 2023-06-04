const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); // Update the require statement

chai.use(chaiHttp);
const expect = chai.expect;

describe('Registration and Grades API', () => {
  it('should register a student', (done) => {
    chai
      .request(app)
      .post('/register')
      .send({
        name: 'John Doe',
        exam1: 90,
        exam2: 85,
        exam3: 95,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Registration successful');
        done();
      });
  });

  it('should get all grades', (done) => {
    chai
      .request(app)
      .get('/grades')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.students).to.be.an('array');
        done();
      });
  });
});
