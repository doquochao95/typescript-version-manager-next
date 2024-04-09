(function () {
  'use strict';
  var assert = require('assert');
  var tvm    = require('../lib/tvm');

  describe('tvm', function() {
    this.timeout(50000);
    before(function(done) {
      console.log('EMULATE TEST\n\n');
      tvm.clean(done);
    });

    it('show usage', function(done) {
      tvm.usage(done);
    });

    // it('show list known', function(done) {
    //   tvm.list_known(done);
    // });

    it('install 5.3.3', function(done) {
      tvm.install('5.3.3', done);
    });

    it('show list', function(done) {
      tvm.list(done);
    });

    it('use 5.3.3', function(done) {
      tvm.use('5.3.3', done);
    });

    it('show list for display current', function(done) {
      tvm.list(done);
    });

    it('uninstall 5.3.3', function(done) {
      tvm.uninstall('5.3.3', done);
    });

    it('show list check uninstall 5.3.3', function(done) {
      tvm.list(done);
    });

    after(function(done) {
      tvm.clean(done);
    });
  });
}());
