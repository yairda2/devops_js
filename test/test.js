const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../public/server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Registration and Grades API', () => {
  after(() => {
    server.close();
  });

  it('should register a student', (done) => {
    chai
      .request(app)
      .post('/students')
      .send({
        name: 'John Doe',
        grade1: 90,
        grade2: 85,
        grade3: 95,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Student registered');
        done();
      });
  });

  it('should get all grades', (done) => {
    chai
      .request(app)
      .get('/grades')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
