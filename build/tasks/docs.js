var gulp = require('gulp');
var typedoc = require("gulp-typedoc");
var ghPages = require('gulp-gh-pages');
var paths = require('../paths');
var runSequence = require('run-sequence');

gulp.task("docs-build", function () {
    return gulp
        .src(paths.source)
        .pipe(typedoc({
            module: "umd",
            target: "es6",
            includeDeclarations: false,
            experimentalDecorators: true,
            out: paths.docs,
            mode: "file",
            name: "e2e4",
            readme: "none",
            ignoreCompilerErrors: false,
            help: true
        }));
});

gulp.task('docs-publish', function () {
    return gulp.src('./docs/**/*')
        .pipe(ghPages());
});

gulp.task('docs', function (callback) {
    return runSequence(
        'docs-build',
        'docs-publish',
        callback
    );
});