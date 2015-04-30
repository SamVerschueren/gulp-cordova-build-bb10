# gulp-cordova-build-bb10

> Build the cordova project for the BlackBerry 10 platform.

## Installation

```bash
npm install --save-dev gulp-cordova-build-bb10
```

## Usage

Make sure the location of the [NDK](http://cordova.apache.org/docs/en/5.0.0/guide_platforms_blackberry10_index.md.html#BlackBerry%2010%20Platform%20Guide) is added
to your path.

```JavaScript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin'),
    bb10 = require('gulp-cordova-build-bb10');

gulp.task('build', function() {
    return gulp.src('www')
        .pipe(create())
        .pipe(plugin('org.apache.cordova.dialogs'))
        .pipe(plugin('org.apache.cordova.camera'))
        .pipe(bb10());
});
```

This plugin will build the cordova project for the BlackBerry 10 platform.

### Re-adding the BlackBerry 10 platform

The ```bb10()``` method accepts one optional parameter. If the parameter passed in is ```true```, it will first
remove the entire BlackBerry 10 platform and add it again.

```JavaScript
var gulp = require('gulp'),
    bb10 = require('gulp-cordova-build-bb10');

gulp.task('rebuild', function() {
    return gulp.src('.cordova')
        .pipe(bb10(true));
});
```

This task will simply remove the BlackBerry 10 platform, add it again and rebuild it.

```bash
$ cordova platform remove blackberry10
$ cordova platform add blackberry10
$ cordova build blackberry10
```

If no parameter is provided, it will only build the platform.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
