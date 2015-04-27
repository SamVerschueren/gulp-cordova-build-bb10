'use strict';

/**
 * Builds the cordova project for the BlackBerry 10 platform.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  27 April 2015
 */

// module dependencies
var path = require('path'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Q = require('q'),
    cordova = require('cordova-lib').cordova.raw;

// export the module
module.exports = function() {

    return through.obj(function(file, enc, cb) {
        // Change the working directory
        process.env.PWD = file.path;

        // Pipe the file to the next step
        this.push(file);

        cb();
    }, function(cb) {
        Q.fcall(function() {
            // First remove the platform because adding the platform twice
            // is not possible.
            return cordova.platforms('rm', 'blackberry10');
        }).then(function() {
            // Add the blackberry10 platform
            return cordova.platforms('add', 'blackberry10');
        }).then(function() {
            // Build the platform
            return cordova.build();
        }).then(cb).catch(function(err) {
            // Return an error if something happened
            cb(new gutil.PluginError('gulp-cordova-build-blackberry10', err.message));
        });
    });
};
