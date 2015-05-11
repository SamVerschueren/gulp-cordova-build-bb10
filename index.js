'use strict';

/**
 * Builds the cordova project for the BlackBerry10 platform.
 *
 * @author Sam Verschueren      <sam.verschueren@gmail.com>
 * @since  27 April 2015
 */

// module dependencies
var path = require('path'),
    fs = require('fs-extra'),
    through = require('through2'),
    gutil = require('gulp-util'),
    Q = require('q'),
    userHome = require('user-home'),
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
            release = options.release === true || options.keystorepass !== undefined;

        Q.fcall(function() {
            // Test if the blackberry platform already exists
            return fs.existsSync(bbPath);
        }).then(function(exists) {
            if(!exists) {
                // Add the blackberry10 platform if it does not exist
                return cordova.platforms('add', 'blackberry10');
            }
        }).then(function() {
            if(options.debugtoken) {
                if(!fs.existsSync(options.debugtoken)) {
                    throw new Error('The debugtoken provided does not exist.');
                }
                
                return fs.copySync(options.debugtoken, path.join(userHome, '.cordova/blackberry10debugtoken.bar'));
            }  
        }).then(function() {
            var opt = [];

            if(release) {
                // If the user wants to build for release, add the keystorepass option
                opt.push('release');

                if(options.keystorepass) {
                    // Only add these arguments if the keystorepass is provided
                    opt.push('--keystorepass');
                    opt.push(options.keystorepass);
                }

                if(options.buildId) {
                    // Add the build ID if it is provided
                    opt.push('--buildId');
                    opt.push(options.buildId);
                }
            }

            // Build the platform
            return cordova.build({platforms: ['blackberry10'], options: opt});
        }).then(function() {
            var base = path.join(bbPath, 'build/device'),
                cwd = process.env.PWD,
                bar = path.join(base, 'bb10app.bar'),
                contents = fs.readFileSync(bar);

            // Make sure the bar is passed to the next step
            self.push(new gutil.File({
                base: base,
                cwd: cwd,
                path: bar,
                contents: contents
            }));

            cb();
        }).catch(function(err) {
            // Return an error if something happened
            cb(new gutil.PluginError('gulp-cordova-build-blackberry10', err.message));
        });
    });
};
