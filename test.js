var nik = require('./');
var config = require('./config');

describe('NIK', function(){
  it('should be valid', function(done) {
    nik({
      nik: config.test.truthy.nik || process.env.NIK,
      name: config.test.truthy.name || process.env.NAME
    }, function(err, obj, distance) {
      if (err)
        done(err);
      obj.Nama.toLowerCase().should.equal(config.test.truthy.name.toLowerCase() || process.env.NAME.toLowerCase());
      done();
    });
  });
  
  it('should be valid but not equal', function(done) {
    var falseName = 'Hihi haha';
    nik({
      nik: config.test.truthy.nik,
      name: falseName,
    }, function(err, obj, distance) {
      if (err)
        done(err);
      obj.Nama.toLowerCase().should.not.equal(falseName.toLowerCase());
      done();
    });
  });
  
  it('should be invalid', function(done) {
    nik({
      nik: 'hihi'
    }, function(err) {
      err.message.should.equal('Not found');
      done();
    });
  });
  
  it('should be another invalid nik', function(done) {
    nik({
      nik: '11111111'
    }, function(err) {
      err.message.should.equal('Not found');
      done();
    });
  });
});

