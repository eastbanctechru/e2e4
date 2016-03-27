var gulp = require('gulp');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var paths = require('../paths');
var typescript = require('gulp-tsb');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var through2 = require('through2');
var tools = require('aurelia-tools');
var to5 = require('gulp-babel');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

var jsName = paths.packageName + '.js';

gulp.task('build-amd', function() {
    var options = require('../../tsconfig.json').compilerOptions;
    options['module'] = 'amd';
    var typescriptCompiler = typescript.create(options);
    return gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(plumber())
        .pipe(typescriptCompiler())
        .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-commonjs', function() {
    var options = require('../../tsconfig.json').compilerOptions;
    options['module'] = 'commonjs';
    var typescriptCompiler = typescript.create(options);
    return gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(plumber())
        .pipe(typescriptCompiler())
        .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-system', function() {
    var options = require('../../tsconfig.json').compilerOptions;
    options['module'] = 'system';
    var typescriptCompiler = typescript.create(options);
    return gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(plumber())
        .pipe(typescriptCompiler())
        .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build', function(callback) {
    return runSequence(
        'clean',
        [
            'build-amd',
            'build-commonjs',
            'build-system'
        ],
        callback
    );
});