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
        .pipe(bb10())
        .pipe(gulp.dest('package'));
});
```

This plugin will build the cordova project for the BlackBerry 10 platform.

Because the plugin returns the bar file, you can pipe it to ```gulp.dest```. This will store the ```bb10app.bar``` file
in the ```package``` directory.

### Sign the bar file

By not passing any options to the plugin, you will receive a debug version of your bar file. It's possible to let the plugin
do the heavy lifting and let it create a signed release version.

```JavaScript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    plugin = require('gulp-cordova-plugin'),
    bb10 = require('gulp-cordova-build-bb10');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(bb10({release: true}))
        .pipe(gulp.dest('package'));
});
```

When running the `build` task, it will now ask for the key store password. When the bar file is signed, it will store the `bb10app.bar` file in the `package` directory.

If you don't want to type in the key store password every time again, you
can pass in the `keystorepass` as option to the plugin. By passing this property
as option, it's not necessary to set `release` to true.

## API

### bb10([options])

#### options

##### release

Type: `boolean`

Should be set to `true` if you want to let the user type in the password every time. This option can be omitted if the `keystorepassword` option is provided.

##### keystorepassword

Type: `string`

The password you defined when you configured your computer to sign applications.

##### buildId

Type: `number`

The build version number of your application. Typically, this number should be incremented from the previous signed version.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren
