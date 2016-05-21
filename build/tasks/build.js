var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var paths = require('../paths');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var assign = Object.assign || require('object.assign');
var merge = require('merge2');

gulp.task('build-es6', function() {
    var options = require('../../tsconfig.json').compilerOptions;
    options['target'] = 'es6';
    options['module'] = 'es6';
    var tsResult = gulp.src(paths.source)
        .pipe(sourcemaps.init())
        .pipe(typescript(options));
    return merge([
        tsResult.dts.pipe(gulp.dest(paths.output + 'es6')),
        tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(paths.output + 'es6'))
    ]);
});

gulp.task('build-amd', function() {
    var options = require('../../tsconfig.json').compilerOptions;
    options['module'] = 'amd';
    options['target'] = 'es5';
    var tsResult = gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(sourcemaps.init())
        .pipe(typescript(options));
    return merge([
        tsResult.dts.pipe(gulp.dest(paths.output + 'amd')),
        tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(paths.output + 'amd'))
    ]);
});

gulp.task('build-commonjs', function() {
    var options = require('../../tsconfig.json').compilerOptions;
    options['module'] = 'commonjs';
    options['target'] = 'es5';
    var tsResult = gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(typescript(options));
    return merge([
        tsResult.dts.pipe(gulp.dest(paths.output + 'commonjs')),
        tsResult.js.pipe(gulp.dest(paths.output + 'commonjs'))
    ]);
});

gulp.task('build-system', function() {
    var options = require('../../tsconfig.json').compilerOptions;
    options['module'] = 'system';
    options['target'] = 'es5';
    var tsResult = gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(typescript(options));
    return merge([
        tsResult.dts.pipe(gulp.dest(paths.output + 'system')),
        tsResult.js.pipe(gulp.dest(paths.output + 'system'))
    ]);
});

gulp.task('build', function(callback) {
    return runSequence(
        'clean',
        [
            'build-amd',
            'build-commonjs',
            'build-system',
            'build-es6'
        ],
        callback
    );
});