const app = require('../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Registration API', () => {
  it('should register a new student', (done) => {
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
        expect(res).to.have.status(201);
        expect(res.text).to.equal('Registered successfully!');
        done();
      });
  });

  it('should retrieve grades for a student', (done) => {
    chai
      .request(app)
      .get('/grades/John Doe')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.include('Exam 1 Grade: 90');
        expect(res.text).to.include('Exam 2 Grade: 85');
        expect(res.text).to.include('Exam 3 Grade: 95');
        done();
      });
  });
});
