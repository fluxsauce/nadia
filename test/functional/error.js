const chai = require('chai');
const chaiHttp = require('chai-http');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const logger = require('morgan');

chai.use(chaiHttp);

const should = chai.should();

describe('app.js', function() {
  // Backup.
  const env = process.env['NODE_ENV'];

  let app;
  let loggerStub;

  before(function() {
    loggerStub = sinon
      .stub(logger, 'morgan')
      .returns(function(req, res, next) {
        next();
      });

    app = proxyquire('../../app', {
      morgan: loggerStub
    });
  });

  after(function() {
    loggerStub.restore();
  });

  describe('errors', function() {
    it('should return a 404 for a missing page in production', function(done) {
      chai.request(app)
        .get('/bananas')
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });
});
