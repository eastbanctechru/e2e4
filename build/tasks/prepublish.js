var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prepublish', function (callback) {
  return runSequence(
    'tslint',
    'build',
    'test',
    callback
  );
});