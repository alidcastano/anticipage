var request = require('supertest');

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../demo/server')
  });
  afterEach(function () {
    server.close();
  });
  it('Adding two routes to the log, same user', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  /*
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
  */
});
