var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var paths = require('../paths');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var assign = Object.assign || require('object.assign');
var merge = require('merge2');

var getES6options = function () {
    var options = require('../../tsconfig.json').compilerOptions;
    options['target'] = 'es6';
    options['module'] = 'es6';
    return options;
}
var getCjsOptions = function () {
    var options = require('../../tsconfig.json').compilerOptions;
    options['module'] = 'commonjs';
    options['target'] = 'es5';
    return options;
}

gulp.task('build-es6', function () {
    var options = getES6options();
    var srcResult = gulp.src(paths.source).pipe(sourcemaps.init()).pipe(typescript(options));
    var indexResult = gulp.src('index.ts').pipe(typescript(options));
    return merge([
        srcResult.dts.pipe(gulp.dest(paths.esmOutput)),
        srcResult.js.pipe(sourcemaps.write()).pipe(gulp.dest(paths.esmOutput)),
        indexResult.dts.pipe(gulp.dest('esm/')),
        indexResult.js.pipe(gulp.dest('esm/'))
    ]);
});

gulp.task('build-commonjs', function () {
    var options = getCjsOptions();
    var srcResult = gulp.src(paths.dtsSrc.concat(paths.source)).pipe(typescript(options));
    var indexResult = gulp.src(paths.dtsSrc.concat('index.ts')).pipe(typescript(options));
    return merge([
        srcResult.dts.pipe(gulp.dest('src/')),
        srcResult.js.pipe(gulp.dest('src/')),
        indexResult.dts.pipe(gulp.dest('./')),
        indexResult.js.pipe(gulp.dest('./'))
    ]);
});

gulp.task('build', function (callback) {
    return runSequence(
        [
            'build-commonjs',
            'build-es6'
        ],
        callback
    );
});