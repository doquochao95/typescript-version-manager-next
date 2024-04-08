(function () {
  'use strict';
  var assert = require('power-assert');
  var tvm    = require('../lib/tvm');
  var exec   = require('child_process').exec;
  var version = '5.3.3';
  var display = 'v' + version;

  describe('tvm', function() {
    this.timeout(15000);
    before(function(done) {
      console.log('TEST BEHAVIOR\n\n');
      tvm.clean(done);
    });

    it('install ' + version, function(done) {
      tvm.install(version, done);
    });

    it('show list', function(done) {
      exec('ls ./typescript', function(err, stdout, stderr) {
        var _version = stdout.replace('\n', '');
        assert.equal(display, _version);
        done();
      });
    });

    after(function(done) {
      tvm.clean(done);
    });
  });
}());
