module.exports = function (version, done) {
  'use strict';
  var async = require('async');
  var fs = require('fs');
  var dirname = require('../config/dirname');

  async.waterfall([
    function (callback) {
      var exists = fs.existsSync(dirname.typescript);
      var list_files = [];

      if (!exists) fs.mkdirSync(dirname.typescript);

      list_files = fs.readdirSync(dirname.typescript);
      list_files = list_files.filter(function (element) {
        return element.match(/^\./) === null;
      });

      var has = list_files.indexOf('v' + version);
      if (has === -1) {
        console.log('Version: ' + version + ' has not found.');
      } else {
        try {
          if (fs.existsSync(dirname.current)) {
            var lstat = fs.lstatSync(dirname.current);
            if (lstat.isSymbolicLink()) fs.unlinkSync(dirname.current);
          }
          const linkType = process.platform === 'win32' ? 'junction' : 'dir';
          fs.symlinkSync(
            dirname.typescript + '\\v' + version,
            dirname.current,
            linkType
          );
          fs.chmodSync(
            dirname.typescript + '\\v' + version + '\\bin\\tsc',
            '0755'
          );
          console.log('Using v' + version);
        } catch (Exception) {
          console.log(Exception);
        }
      }
      callback(null);
    },
    function (callback) {
      if (typeof done === 'function') done();
    },
  ]);
};
