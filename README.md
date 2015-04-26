# gulp-cordova-build-android

> This step builds the cordova project for the Android platform

## Installation

```bash
npm install --save-dev gulp-crodva-build-bb10
```

**Not yet available**

## Usage

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

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
