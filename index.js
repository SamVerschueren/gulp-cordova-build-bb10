'use strict';

/**
 * Builds the cordova project for the BlackBerry10 platform.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  27 April 2015
 */

// module dependencies
var path = require('path'),
    fs = require('fs'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Q = require('q'),
    cordovaLib = require('cordova-lib').cordova,
    cordova = cordovaLib.raw;

// export the module
module.exports = function(options) {

    options = options || {};

    return through.obj(function(file, enc, cb) {
        // Change the working directory
        process.env.PWD = file.path;

        cb();
    }, function(cb) {
        var self = this,
            bbPath = path.join(cordovaLib.findProjectRoot(), 'platforms', 'blackberry10'),
            release = options.keystorepass;

        Q.fcall(function() {
            return fs.existsSync(bbPath);
        }).then(function(exists) {
            if(!exists) {
                // Add the blackberry10 platform if it does not exist
                return cordova.platforms('add', 'blackberry10');
            }
        }).then(function() {
            var opt = [];

            if(release) {
                // If the user wants to build for release, add the keystorepass option
                opt.push('--release');
            }

            // Build the platform
            return cordova.build({platforms: ['blackberry10'], options: opt});
        }).then(cb).catch(function(err) {
            // Return an error if something happened
            cb(new gutil.PluginError('gulp-cordova-build-blackberry10', err.message));
        });
    });
};
