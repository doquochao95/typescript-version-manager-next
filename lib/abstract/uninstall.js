module.exports = function (version, done) {
  'use strict';
  var async = require('async');
  var exec = require('child_process').exec;
  var fs = require('fs');
  var dirname = require('../config/dirname');
  var pathLib = require('path');
  function emptyDir(path) {
    const dirContents = fs.readdirSync(path);
    for (const fileOrDirPath of dirContents) {
      try {
        const fullPath = pathLib.join(path, fileOrDirPath);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          if (fs.readdirSync(fullPath).length) emptyDir(fullPath);
          fs.rmSync(fullPath, { recursive: true, force: true });
        } else fs.unlinkSync(fullPath);
      } catch (ex) {
        console.error(ex.message);
      }
    }
  }
  async.waterfall([
    function (callback) {
      var path = dirname.typescript + '\\v' + version;
      var exists = fs.existsSync(path);
      if (!exists) {
        console.log(version + ' is not installed.');
        return;
      } else {
        callback(null, path);
      }
    },
    function (path, callback) {
      emptyDir(path);
      callback(null);
    },
    function (callback) {
      var path = dirname.src + '\\v' + version;
      callback(null, path);
    },
    function (path, callback) {
      emptyDir(path);
      callback(null);
    },
    function (callback) {
      console.log('\nDone');
      if (typeof done === 'function') done();
    },
  ]);
  return true;
};
