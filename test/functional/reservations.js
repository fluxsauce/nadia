process.env['DEBUG'] = 'nadia:*';

const chai = require('chai');
const chaiHttp = require('chai-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const db = require('sqlite');

chai.use(chaiHttp);

const should = chai.should();

describe('/reservations', function() {
  const dbStub = sinon.stub(db, 'run').resolves({
    stmt: {
      lastID: 1349
    }
  });
  let app;

  before(function() {
    app = proxyquire('../../app', {
      sqlite: dbStub,
    });
  });

  after(function() {
    dbStub.restore();
  });

  describe('GET', function() {
    it('responds with status 200', function(done) {
      chai.request(app)
        .get('/reservations')
        .end(function(err, res) {
          res.should.have.status(200);
          res.text.should.contain('To make reservations please fill out the following form');
          done(err);
        });
    });
  });
  describe('POST', function() {
    it('should accept a valid reservation request', function(done) {
      chai.request(app)
        .post('/reservations')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          date: '2017/06/10',
          time: '06:02 AM',
          party: 4,
          name: 'Family',
          email: 'username@example.com'
        })
        .end(function(err, res) {
          res.text.should.contain('Thanks, your booking request #1349');
          res.should.have.status(200);
          done(err);
        });
    })
  })
});
