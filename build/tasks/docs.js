var gulp = require('gulp');
var typedoc = require('gulp-typedoc');
var paths = require('../paths');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var runSequence = require('run-sequence');

gulp.task('clean-docs', function () {
    return gulp.src([paths.docs]).pipe(vinylPaths(del));
});

gulp.task('build-docs', function () {
    return gulp
        .src(paths.source)
        .pipe(typedoc({
            experimentalDecorators: true,
            gaID: 'UA-47538916-3',
            help: true,
            ignoreCompilerErrors: false,
            includeDeclarations: false,
            mode: 'file',
            module: 'umd',
            name: 'e2e4',
            out: paths.docs,
            readme: 'none',
            target: 'es6'
        }));
});

gulp.task('docs', function (callback) {
    return runSequence(
        'clean-docs',
        'build-docs',
        callback
    );
});