/*
 * grunt-doxmate
 * https://github.com/luozhihua/grunt-doxmate
 *
 * Copyright (c) 2014 Colin Luo
 * Licensed under the MIT license.
 */

var exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    rimraf = require('rimraf');


module.exports = function(grunt) {

  grunt.registerMultiTask('doxmate', 'Generate dox output ', function() {

    var dir  = this.filesSrc,
        dest = this.data.dest,
        done = this.async(),
        doxPath = path.resolve(__dirname, '../'),
        opts   = this.options(),
        args   = [],
        cmd;

    if (this.data.output) {
      args.push('-o');
      args.push(this.data.output);
    }

    if (this.data.theme) {
      args.push('-s');
      args.push(this.data.theme);
    }

    if (this.data.dir) {
      args.push('-d');
      args.push(this.data.dir);
    }

    cmd = 'doxmate build ' + args.join(' ');
    exec(cmd, {maxBuffer: 5000*1024}, function(error, stout, sterr) {
      if (error) { grunt.log.error("ERROR:  "+ error); }
      if (!error) {
        grunt.log.ok('Directory "' + dir + '" doxxed.');
        done();
      }
    });
    // Absolute path to the formatter
    //var formatter = [doxPath, 'node_modules', '.bin', 'doxmate'].join(path.sep);

/*
    // Cleanup any existing docs
    rimraf.sync(dest);

    _args.push('--source');
    _args.push(dir);
    _args.push('--o');
    _args.push(dest);

    // Set options to arguments
    if(_opts.title){
      _args.push('--title');
      _args.push('"' + _opts.title + '"');
    }

    // Pass through ignore params if set
    if (this.data.ignore) {
      _args.push('--ignore');
      this.data.ignore.forEach(function(ignorePath) {
        _args.push(doxPath + ignorePath);
      });

    }

    exec('doxmate build  ' + _args.join(" "), {maxBuffer: 5000*1024}, function(error, stout, sterr){
      if (error) { grunt.log.error("ERROR:  "+ error); }
      if (!error) {
        grunt.log.ok('Directory "' + dir + '" doxxed.');
        done();
      }
    });
*/
  });
};
