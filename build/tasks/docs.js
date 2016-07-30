var gulp = require('gulp');
var typedoc = require("gulp-typedoc");
var paths = require('../paths');

gulp.task("docs", function () {
    return gulp
        .src(paths.source)
        .pipe(typedoc({
            module: "umd",
            target: "es6",
            includeDeclarations: false,
            experimentalDecorators: true,

            out: "./reports/docs",
            mode: "file",
            name: "e2e4",
            ignoreCompilerErrors: true,
            version: true
        }));
});