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
module.exports = function(rm) {

    return through.obj(function(file, enc, cb) {
        // Change the working directory
        process.env.PWD = file.path;

        // Pipe the file to the next step
        this.push(file);

        cb();
    }, function(cb) {
        var exists = fs.existsSync(path.join(cordovaLib.findProjectRoot(), 'platforms', 'blackberry10')),
            reAdd = exists === true && rm === true;

        Q.fcall(function() {
            if(reAdd) {
                // First remove the platform if we have to re-add it
                return cordova.platforms('rm', 'blackberry10');
            }
        }).then(function() {
            if(exists === false || reAdd) {
                // Add the blackberry10 platform if it does not exist or we have to re-add it
                return cordova.platforms('add', 'blackberry10');
            }
        }).then(function() {
            // Build the platform
            return cordova.build({platforms: ['blackberry10']});
        }).then(cb).catch(function(err) {
            // Return an error if something happened
            cb(new gutil.PluginError('gulp-cordova-build-blackberry10', err.message));
        });
    });
};
