var gulp = require('gulp');
var paths = require('../paths');
var tslint = require('gulp-tslint');
 
gulp.task('tslint', function() {
  return gulp.src([paths.source, paths.tests])
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: false
    }));
});