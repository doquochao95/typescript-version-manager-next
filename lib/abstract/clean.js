module.exports = function (done) {
  'use strict';
  var async = require('async');
  var child_process = require('child_process');
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
      console.log('Cleaning...');
      callback(null);
    },
    function (callback) {
      var path = dirname.typescript;
      var exist = fs.existsSync(path);
      if (exist) emptyDir(path);
      callback(null);
    },
    function (callback) {
      var path = dirname.src;
      var exist = fs.existsSync(path);
      if (exist) emptyDir(path);
      callback(null);
    },
    function (callback) {
      try {
        var path = dirname.current;
        var exist = fs.existsSync(path);
        if (exist){
          var lstat = fs.lstatSync(dirname.current);
          if (lstat.isSymbolicLink()) fs.unlinkSync(dirname.current);
        }
        callback(null);
      } catch (Exception) {}
    },
    function (callback) {
      console.log('\nDone');
      if (typeof done === 'function') done();
    },
  ]);
  return true;
};
